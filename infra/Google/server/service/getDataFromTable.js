import { SpreadsheetApp } from './auth/googleApps.js';

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

/**
 * @param spreadsheetId - ID of the Google spreadsheet.
 * @return {Array} [sheetTitles] - Array of all sheets in the spreadsheet.
*/
export const getSheetsTitlesArray = async (spreadsheetId) => SpreadsheetApp.spreadsheets
  .get({ spreadsheetId })
  .then(({ data }) => data.sheets.map((sheet) => {
    const { properties } = sheet;
    const { title } = properties;
    return title;
  }));

/**
 * @param {spreadsheetId} - ID of the Google spreadsheet.
 * @return {Array} [{
    range: "'Kids goods and toys'!A1:BA1000",
    majorDimension: 'COLUMNS',
    values: [ [Array], [Array] ]
  },{
    range: "'Values (Kids goods and toys)'!A1:CV20000",
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
