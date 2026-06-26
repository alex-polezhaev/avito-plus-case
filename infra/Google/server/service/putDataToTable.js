import { SpreadsheetApp } from './auth/googleApps.js';

/**
 * Inserts data into the spreadsheet in the format returned by getallTableValues
 */
export const pasteTableData = async (spreadsheetId, tableData) => SpreadsheetApp
  .spreadsheets
  .values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: tableData,
    },
  }).then(() => console.log(`Data insertion into the spreadsheet finished ${spreadsheetId}`));
