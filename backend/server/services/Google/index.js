import _ from 'lodash';
import { getAllTableValues } from './getDataFromTable.js';
import { pasteTableData } from './putDataToTable.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

/**
 * Final callback of the pipeline. Restricts the write-back to the columns named
 * in fieldsToChange so columns a user edited mid-run are not overwritten.
 * @function
 * @param  {Array} values Column data from the Google sheet.
 * @param  {Object} data Arbitrary data, must include fieldsToChange.
 * @returns {Array} Data to write back to the Google sheet.
 */
const finalCallback = (values, { fieldsToChange }) => {
  if (fieldsToChange.length === 0) return values;
  const newValues = values.map((value) => {
    const [currentColName] = value;
    if (fieldsToChange.includes(currentColName)) {
      return value;
    }
    return [null];
  });
  return newValues;
};

/**
 * Reads a spreadsheet, transforms it through one or more callbacks and writes
 * the result back.
 * @function updateTableValues
 * @param  {String} spreadsheetId Google spreadsheet id.
 * @param  {Array|Function} callbacksOrCallback A single callback or an array of
 * callbacks. Each callback receives the sheet values as the first argument and
 * arbitrary data as the second.
 * @param  {Array} fieldsToChange Column names that may be changed; protects the
 * columns a user edited while the main function was running. Optional - when
 * omitted, all data may change.
 * @param  {Object} data Arbitrary data passed to every callback.
 * @returns {void}
 */
export default async (spreadsheetId, callbacksOrCallback, fieldsToChange = [], data = {}) => {
  try {
    const callbacks = callbacksOrCallback instanceof Function
      ? [callbacksOrCallback, finalCallback] : [...callbacksOrCallback, finalCallback];
    const currentTableData = await getAllTableValues(spreadsheetId, 'COLUMNS');
    const resultTableDataPromises = currentTableData.map(async (sheet) => {
      const { range, majorDimension, values } = sheet;
      if (range.startsWith("'Values")
      || range.startsWith("'Ⓜ️ Metro stations")
      || range.startsWith("'📌 Instructions")) {
        return sheet;
      }

      let newValues = _.cloneDeep(values);
      for (let i = 0; i < callbacks.length; i += 1) {
        const callback = callbacks[i];
        /* eslint-disable no-await-in-loop */
        newValues = await callback(newValues, {
          sheetTitle: range,
          ...data,
          fieldsToChange,
        });
        /* eslint-enable no-await-in-loop */
      }

      const newSheet = {
        range,
        majorDimension,
        values: newValues,
      };
      return newSheet;
    });
    const resultTableData = await Promise.all(resultTableDataPromises);
    pasteTableData(spreadsheetId, resultTableData);
  } catch (error) {
    logger.error(error);
  }
};
