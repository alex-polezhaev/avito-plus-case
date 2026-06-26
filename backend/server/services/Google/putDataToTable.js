import { SpreadsheetApp } from './auth/googleApps.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

const pastColByLetter = async (spreadsheetId, sheetTitle, linksArr, letter) => SpreadsheetApp
  .spreadsheets
  .values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: [
        {
          range: `${sheetTitle}!${letter}3:${letter}100000`,
          majorDimension: 'COLUMNS',
          values: [linksArr],
        },
      ],
    },
  });

export default pastColByLetter;

export const pasteTableData = async (spreadsheetId, tableData) => {
  SpreadsheetApp.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: tableData,
    },
  });
};

export const editSpreadsheetTitle = async (spreadsheetId, newTitle) => SpreadsheetApp.spreadsheets
  .batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSpreadsheetProperties: {
            properties: {
              title: `${newTitle} - Avito Plus`,
            },
            fields: '*',
          },
        },
      ],
    },
  })
  .catch((err) => {
    logger.error(`Failed to update the title of spreadsheet ${spreadsheetId}. Needs attention!`);
    logger.error(err);
    return 'Please try again';
  });
