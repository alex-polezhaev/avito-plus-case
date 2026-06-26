import fs from 'fs/promises';
import _ from 'lodash';
import { getAllTableValues } from './getDataFromTable.js';
import { pasteTableData } from './putDataToTable.js';
import { generateXML } from './generateXML.js';
import { markUsedTasks } from './markUsedTasks.js';

/**
 * Function that completes the main function. Used to change only the fields
 * that were passed via the fieldsToChange parameter.
 * @function
 * @param  {Array} values Array of values from the Google spreadsheet.
 * @param  {Object} data Arbitrary data with a required fieldsToChange field.
 * @returns {Array} Returns data for the Google spreadsheet.
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
 * Function that reads data from the spreadsheet,
 * processes it with one or more callbacks and writes the data back to the spreadsheet
 * @function updateTableValues
 * @param  {String} spreadsheetId Id of the Google spreadsheet
 * @param  {Array or Function} callbacksOrCallback A single callback or an array of callbacks
 * - the function accepts any number of handlers (callbacks).
 * The callback receives the spreadsheet values as its first parameter,
 * and arbitrary data as an object as its second - this data must be passed to the main function.
 * @param  {Array} fieldsToChange Array of fields to change - this is needed so that
 * fields edited by the user while the main function runs are not accidentally overwritten.
 * Optional parameter; if omitted, all data is changed.
 * @param  {Object} data Arbitrary data passed to the callback.
 * @returns {void}
 */

export default async (spreadsheetId, callbacksOrCallback, fieldsToChange = [], data = {}) => {
  const startTime = new Date();

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
    await markUsedTasks(data.accID, startTime, 'slides');
    await pasteTableData(spreadsheetId, resultTableData);

    await generateXML(data.accID, currentTableData);
    const tableDataFilePath = `/app/table-data/${spreadsheetId}.json`;
    await fs.writeFile(tableDataFilePath, JSON.stringify(currentTableData));
  } catch (error) {
    console.error(error);
  }
};
