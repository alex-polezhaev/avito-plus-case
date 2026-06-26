import { SpreadsheetApp } from './auth/googleApps.js';
import {
  parseFields,
  pasteTags,
  createEnumList,
  setEnumValues,
  writeSheetIdHiddenColumn,
} from './createSpreadSheet.js';
import { getFieldById } from '../Mongoose/fieldsDB.js';
import { getSheetTitle } from './getDataFromTable.js';

const sleep = (time) => new Promise((res) => { setTimeout(res, time); });

const copySheet = async (spreadsheetId, category) => {
  const tableSample = process.env.TABLE_SAMPLE;
  const sheetSample = process.env.SHEET_SAMPLE;
  const newSheet = await SpreadsheetApp.spreadsheets.sheets.copyTo({
    spreadsheetId: tableSample,
    sheetId: sheetSample,
    requestBody: {
      destinationSpreadsheetId: spreadsheetId,
    },
  }).then(({ data }) => data);
  SpreadsheetApp.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: newSheet.sheetId,
              title: category,
            },
            fields: 'title',
          },
        },
      ],
    },
  });
  await sleep(1000);
  newSheet.title = await getSheetTitle(spreadsheetId, await newSheet.sheetId);
  return newSheet;
};

const addSheet = async (spreadsheetId, category) => {
  const fields = await getFieldById(category);
  const newSheet = await copySheet(spreadsheetId, category);
  const parsingResult = parseFields(category, fields);
  await sleep(1000);
  await pasteTags(
    spreadsheetId,
    newSheet.sheetId,
    parsingResult.tagsAndTitlesArray,
    newSheet.title,
  );
  await writeSheetIdHiddenColumn(
    spreadsheetId,
    newSheet.sheetId,
  );
  const enumSheet = await createEnumList(spreadsheetId, parsingResult.optionsArray, category);
  await sleep(1000);
  await setEnumValues(
    spreadsheetId,
    newSheet.sheetId,
    parsingResult.optionsArray,
    category,
  );
  return { newSheet, enumSheet };
};

export default addSheet;
