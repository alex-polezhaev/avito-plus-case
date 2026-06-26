import { SpreadsheetApp } from '../auth/google-apps.js';
import _ from 'lodash';

const getSheetsTitles = (spreadsheetId) => SpreadsheetApp.spreadsheets.get({ spreadsheetId })
  .then(({ data }) => {
    const { sheets } = data;
    const sheetNames = sheets.map(({ properties }) => properties.title);
    return sheetNames;
  });

export default (spreadsheetId) => getSheetsTitles(spreadsheetId)
  .then((ranges) => SpreadsheetApp
      .spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    }))
  .then((result) => result.data.valueRanges)
  .then((sheets) => sheets.map(({ values }) => _.zip(...values)))
  .then((arrOfArrs) => arrOfArrs.reduce((acc, arr) => [...acc, ...arr], []));