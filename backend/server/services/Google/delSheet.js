import { SpreadsheetApp } from './auth/googleApps.js';

const deleteSheet = (spreadsheetId, sheetId) => SpreadsheetApp.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: {
    requests: [{ deleteSheet: { sheetId } }],
  },
});

export default deleteSheet;
