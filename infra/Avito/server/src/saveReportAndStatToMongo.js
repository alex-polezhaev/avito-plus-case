import fs from 'fs/promises';
import avitoAuth from './authAvito.js';
import {
  getLastAvitoReport,
  getAllAdsByReport,
  formatReport,
  getAvitoStatItems,
  formatAvitoStat,
} from './reportAndStatHelpers.js';

/**
 * @async
 * @function loadAvitoReport
 * @param {Array} values Data from the Google spreadsheet
 * @param {Object} data Auxiliary data
 * @returns {Array} Processed data for the Google spreadsheet
 * @description Main function for fetching the Avito autoload report
 */

export const saveReportAndStatToMongo = async (acc) => {
  try {
    // Authorization
    const { clientId, clientSecret, id: avitoUserID } = acc.avito;
    if (!clientId || !clientSecret || !avitoUserID) {
      throw new Error('It is not possible to start saving the report and statistics to the database because the necessary data is not available.');
    }
    const token = await avitoAuth(clientId, clientSecret);

    // Latest report
    const lastReport = await getLastAvitoReport(token);
    const { finished_at: finishTime, id: reportID } = lastReport;

    // Fetch, format, upload to the database
    const ads = await getAllAdsByReport(token, reportID);
    const formatedReport = formatReport(ads, finishTime);

    // Fetch statistics
    const statItems = await getAvitoStatItems(token, acc);
    const formatedStat = formatAvitoStat(statItems, ads);

    // Write to files
    const reportProm = fs.writeFile(
      `./server/reportsJson/${acc._id}.json`,
      JSON.stringify(formatedReport),
    ).then(() => console.log(`Report file written ${acc.title}`))
      .catch((error) => console.log(error));

    const statProm = fs.writeFile(
      `./server/statJson/${acc._id}.json`,
      JSON.stringify(formatedStat),
    ).then(() => console.log(`Stat file written ${acc.title}`))
      .catch((error) => console.log(error));

    return Promise.all([reportProm, statProm]);
  } catch (error) {
    console.error(error);
    console.error('Error in loadAvitoReport');
  }
};
