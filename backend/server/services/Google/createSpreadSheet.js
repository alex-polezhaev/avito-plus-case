import { DriveApp, SpreadsheetApp } from './auth/googleApps.js';
import { getFieldById } from '../Mongoose/fieldsDB.js';
import updateTableData from './index.js';

export const copySample = async (accTitle, category) => {
  const newSpreadSheet = await DriveApp.files
    .copy({
      fileId: process.env.TABLE_SAMPLE,
    })
    .then(({ data }) => {
      DriveApp.permissions.create({
        fileId: data.id,
        requestBody: {
          role: 'writer',
          type: 'user',
          emailAddress: process.env.MANAGER_TABLE_EMAIL,
        },
      });
      DriveApp.permissions.create({
        fileId: data.id,
        requestBody: {
          role: 'writer',
          type: 'anyone',
        },
      });
      return data.id;
    })
    .then((spreadsheetId) => SpreadsheetApp.spreadsheets
      .get({ spreadsheetId })
      .then(({ data }) => ({
        spreadsheetId: data.spreadsheetId,
        spreadsheetLink: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}`,
        spreadsheetTitle: accTitle,
        sheetId: data.sheets[0].properties.sheetId,
        sheetTitle: category,
      })));
  SpreadsheetApp.spreadsheets.batchUpdate({
    spreadsheetId: newSpreadSheet.spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSpreadsheetProperties: {
            properties: {
              title: `${accTitle} - Avito Plus`,
              locale: 'ru_RU',
            },
            fields: '*',
          },
        },
        {
          updateSheetProperties: {
            properties: {
              sheetId: newSpreadSheet.sheetId,
              title: category,
            },
            fields: 'title',
          },
        },
      ],
    },
  });
  return newSpreadSheet;
};

export const parseFields = (category, fields) => {
  const tagsArray = [];
  const titlesArray = [];
  const optionsArray = [];
  fields.forEach((el) => {
    if (el.categoryName === category) {
      el.tags.forEach((tg) => {
        tagsArray.push(tg.tag);
        titlesArray.push(tg.title);
        optionsArray.push(tg.options);
      });
    }
  });
  return { tagsAndTitlesArray: [tagsArray, titlesArray], optionsArray };
};

export const pasteTags = async (spreadsheetId, sheetId, values, sheetTitle) => {
  SpreadsheetApp.spreadsheets.values
    .update({
      spreadsheetId,
      range: `${sheetTitle}!AT:DH`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        majorDimension: 'ROWS',
        values,
      },
    })
    .then(() => SpreadsheetApp.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addDimensionGroup: {
              range: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 46,
                endIndex: 45 + values[0].length,
              },
            },
          },
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 45 + values[0].length,
                endIndex: 500,
              },
            },
          },
        ],
      },
    }));
};

export const createEnumList = async (spreadsheetId, values, category) => {
  const enumSheet = await SpreadsheetApp.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: `Values (${category})`,
              hidden: true,
              gridProperties: { rowCount: 20000, columnCount: 100 },
            },
          },
        },
      ],
    },
  }).then(({ data }) => data);

  SpreadsheetApp.spreadsheets.values.append({
    spreadsheetId,
    range: enumSheet.replies[0].addSheet.properties.title,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      range: enumSheet.replies[0].addSheet.properties.title,
      majorDimension: 'COLUMNS',
      values,
    },
  });
  return enumSheet.replies[0].addSheet.properties.sheetId;
};

export const setEnumValues = async (spreadsheetId, sheetId, optionsArray, category) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE',
    'BF', 'BG', 'BH', 'BI', 'BJ',
    'BK', 'BL', 'BM', 'BN', 'BO',
    'BP', 'BQ', 'BR', 'BS', 'BT',
    'BU', 'BV', 'BW', 'BX', 'BY',
    'BZ',
  ];
  let letterIndex = 0;
  let startColumnIndex = 45;
  const requests = [];
  optionsArray.forEach(() => {
    requests.push({
      setDataValidation: {
        range: {
          sheetId,
          startRowIndex: 2,
          endRowIndex: 1000,
          startColumnIndex,
          endColumnIndex: startColumnIndex + 1,
        },
        rule: {
          condition: {
            type: 'ONE_OF_RANGE',
            values: [
              {
                userEnteredValue: `='Values (${category})'!$${letters[letterIndex]}$1:$${letters[letterIndex]}$20000`,
              },
            ],
          },
          strict: true,
          showCustomUi: true,
        },
      },
    });
    startColumnIndex += 1;
    letterIndex += 1;
  });
  return SpreadsheetApp.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests,
    },
  });
};
/**
 * writeSheetIdHiddenColumn
 * Writes the sheet id into a hidden column
 * @param sheetId
 * @param spreadsheetId
 */
export const writeSheetIdHiddenColumn = (spreadsheetId, sheetId) => {
  const action = (values) => values.map((column) => {
    const newColumn = [...column];
    if (newColumn[0] === 'SheetID' && !newColumn[1]) {
      newColumn[1] = sheetId;
    }
    return newColumn;
  });
  return updateTableData(spreadsheetId, action, ['SheetID']);
};

const createSpreadSheet = async (category, accTitle) => {
  const sleep = (time) => new Promise((res) => { setTimeout(res, time); });
  const fields = await getFieldById(category);
  const newSpreadSheet = await copySample(accTitle, category);
  const parsingResult = parseFields(category, fields);
  await sleep(1000);
  await pasteTags(
    newSpreadSheet.spreadsheetId,
    newSpreadSheet.sheetId,
    parsingResult.tagsAndTitlesArray,
    newSpreadSheet.sheetTitle,
  );
  await writeSheetIdHiddenColumn(
    newSpreadSheet.spreadsheetId,
    newSpreadSheet.sheetId,
  );
  const enumSheet = await createEnumList(
    newSpreadSheet.spreadsheetId,
    parsingResult.optionsArray,
    category,
  );
  await sleep(1000);
  await setEnumValues(
    newSpreadSheet.spreadsheetId,
    newSpreadSheet.sheetId,
    parsingResult.optionsArray,
    category,
  );
  return {
    tableID: newSpreadSheet.spreadsheetId,
    sheetID: newSpreadSheet.sheetId,
    tableLink: newSpreadSheet.spreadsheetLink,
    options_sheet_id: enumSheet,

  };
};

export default createSpreadSheet;
