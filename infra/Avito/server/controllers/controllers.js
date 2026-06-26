/* eslint-disable no-new */
import fs from 'fs/promises';
import { setAvitoSettings, getProfile } from '../src/setAvitoSettings.js';
import { saveReportAndStatToMongo } from '../src/saveReportAndStatToMongo.js';
import { updateAccById, getAccById } from '../src/helpers/mongoFuncs.js';

const sleep = (time) => new Promise((res) => {
  setTimeout(res, time);
});

/**
 * @module Avito
 * @file Controllers for interacting with Avito
 */

const handleServerError = (res, error) => {
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {put} /connect/:accID Set the XML link and configure autoload
 * @apiName setAvitoSettings
 * @apiGroup Avito
 * @apiParam {String} accID Account ID
 * @apiBody {Object} Example: {
    "avito": {
        "clientId": "E2OlLMxGKOWBlp_11nBc",
        "clientSecret": "-H7LDGGqGtsY9LJzMHJDFNJNJ9o1K9WytRGAlib"
    }
}
 */

export const setAvitoSettingsController = async (req, res) => {
  try {
    await updateAccById(req.params.accID, req.body);
    const accData = await getAccById(req.params.accID);
    setAvitoSettings(
      accData.avito.clientId,
      accData.avito.clientSecret,
      `${process.env.BACKEND_DOMAIN}/xml/${accData._id}`,
    );
    const {
      id,
      name,
      phone,
      profile_url: profileUrl,
      email,
    } = await getProfile(accData.avito.clientId, accData.avito.clientSecret);
    return updateAccById(req.params.accID, {
      avito: {
        id,
        name,
        phone,
        profile_url: profileUrl,
        email,
        clientId: accData.avito.clientId,
        clientSecret: accData.avito.clientSecret,
      },
    })
      .then(() => {
        res.status(200).send('Avito settings updated successfully');
      })
      .catch(handleAsyncServerError(res));
  } catch (error) {
    console.error(error);
    handleServerError(res, error);
  }
};

/**
 * startAvitoReportAndStatController
 * Load data from active spreadsheets into local server storage for XML access
 * 3 requests to Google per pass every 2.0 seconds
 * 90 requests per minute to Google
 * CRON every 45 min
 * The callback order matters because loadAvitoStats
 * uses Avito ids taken from the spreadsheet thanks to loadAvitoReport
 */
export const saveReportAndStatToMongoController = async (req, res) => {
  const { validAccs } = req.body;

  if (validAccs?.length === 0) {
    return res.status(400).end('zero validAccs');
  }
  const requests = validAccs.map(async (acc, index) => {
    const timeToSleep = (index + 1) * 2000;
    await sleep(timeToSleep);

    console.log(`started report & stat ${acc.title} delay: ${timeToSleep} order:${index}} `);

    return saveReportAndStatToMongo(acc);
  });

  Promise.all(requests)
    .then(() => {
      res.status(200).json({
        message: `Loading of avito report is done for ${validAccs.length} accounts`,
      });
    })
    .catch((error) => handleServerError(error));
};

/**
 * Get report and stat data from memory
 */
export const getActualReportController = async (req, res) => {
  const { accID } = req.params;

  if (!accID) {
    return res.status(400).end('accID lost');
  }

  fs.readFile(`./server/reportsJson/${accID}.json`, 'utf-8')
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => handleServerError(res, error));
};

/**
 * Get report and stat data from memory
 */
export const getActualStatController = async (req, res) => {
  const { accID } = req.params;

  if (!accID) {
    return res.status(400).end('accID lost');
  }

  fs.readFile(`./server/statJson/${accID}.json`, 'utf-8')
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => handleServerError(res, error));
};
