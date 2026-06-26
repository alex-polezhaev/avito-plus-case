import fs from 'fs';
import { SpreadsheetApp } from './auth/googleApps.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ',
];

export const getDataFromTableByRanges = (
  spreadsheetId,
  ranges,
  majorDimension = 'ROWS',
) => SpreadsheetApp.spreadsheets.values
  .batchGet(
    { spreadsheetId, ranges },
    { params: { majorDimension } },
  )
  .then(({ data }) => data);

export const getAllSheetsFromTable = (spreadsheetId) => SpreadsheetApp
  .spreadsheets.get({ spreadsheetId })
  .then(({ data }) => data.sheets)
  .catch((error) => {
    logger.error(error);
    throw new Error("Can't get all sheets from table");
  });

export const getAllSheetTitlesFromTable = (spreadsheetId) => getAllSheetsFromTable(spreadsheetId)
  .then((data) => {
    const { sheets } = data;
    const sheetNames = sheets
      .map(({ properties }) => properties.title);
    return sheetNames;
  });

export const getSheetTitle = (spreadsheetId, sheetID) => SpreadsheetApp
  .spreadsheets.get({ spreadsheetId })
  .then(({ data }) => {
    const { sheets } = data;
    for (let i = 0; i < sheets.length; i += 1) {
      const { properties: { sheetId, title } } = sheets[i];
      if (sheetId === +sheetID) {
        return title;
      }
    }
    throw new Error('No sheet');
  });

export const getValuesByTitles = (spreadsheetId, titles, dimension = 'ROWS') => getDataFromTableByRanges(spreadsheetId, titles, dimension)
  .then((data) => {
    const { valueRanges } = data;
    return valueRanges.map((el) => el.values);
  });

export const getAllDataFromTable = (spreadsheetId) => getAllSheetTitlesFromTable(spreadsheetId)
  .then((sheetNames) => getValuesByTitles(spreadsheetId, sheetNames));

export const getIndexAndArrayByColumnName = async (spreadsheetId, sheetTitle, columnName) => {
  try {
    const index = await getDataFromTableByRanges(spreadsheetId, sheetTitle, 'ROWS')
      .then((data) => data.valueRanges[0].values[0].indexOf(columnName));
    const array = await getDataFromTableByRanges(spreadsheetId, sheetTitle, 'COLUMNS')
      .then((data) => data.valueRanges[0].values[index].slice(2));
    return { index, array, letter: letters[index] };
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error in getIndexAndArrayByColumnName function');
  }
};

export const createArrayToYandex = (ImageFolder, Images) => ImageFolder.array.map((el, index) => {
  if (Images.array[index] && el) {
    return false;
  }
  if (!el) {
    return false;
  }
  return el;
});

/**
 * @param spreadsheetId - Google spreadsheet id.
 * @return {Object} { sheetId : title } - Object of every sheet in the spreadsheet.
*/
export const getSheetsTitlesKeyValue = async (spreadsheetId) => SpreadsheetApp.spreadsheets
  .get({ spreadsheetId })
  .then(({ data }) => data.sheets.map((sheet) => {
    const { properties } = sheet;
    const { sheetId } = properties;
    const { title } = properties;
    return { [sheetId]: title };
  }))
  .then((obj) => Object.assign(...obj));

/**
 * @param spreadsheetId - Google spreadsheet id.
 * @return {Array} [sheetTitles] - Array of every sheet in the spreadsheet.
*/
export const getSheetsTitlesArray = async (spreadsheetId) => SpreadsheetApp.spreadsheets
  .get({ spreadsheetId })
  .then(({ data }) => data.sheets.map((sheet) => {
    const { properties } = sheet;
    const { title } = properties;
    return title;
  }));

/**
 * @param {spreadsheetId} - Google spreadsheet id.
 * @return {Array} [{
    range: "'Children goods and toys'!A1:BA1000",
    majorDimension: 'COLUMNS',
    values: [ [Array], [Array] ]
  },{
    range: "'Values (Children goods and toys)'!A1:CV20000",
    majorDimension: 'COLUMNS',
    values: [ [Array], [Array] ]
  }]
*/
export const getAllTableValues = async (spreadsheetId, majorDimension = 'COLUMNS') => SpreadsheetApp
  .spreadsheets
  .values
  .batchGet(
    {
      spreadsheetId,
      ranges: await getSheetsTitlesArray(spreadsheetId),
    },
    { params: { majorDimension } },
  )
  .then(({ data }) => data.valueRanges);

/**
 * getTableValuesFromStorage
 * Reads a spreadsheet's cached data from local storage (Google/tablesData).
 */
export const getTableValuesFromStorage = (accID) => new Promise((resolve, reject) => {
  fs.readFile(
    `./server/services/Google/tablesData/${accID}.json`,
    'utf-8',
    (err, data) => {
      if (data) {
        resolve(data);
      }
      reject(err);
    },
  );
})
  .then((data) => JSON.parse(data))
  .catch((err) => logger.warn(`No cached table data file for account "${accID}" ===> ${err?.message}`));
