import { oneMinuteTableScripts } from '../service/oneMinuteTableScripts.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const sleep = (time) => new Promise((res) => { setTimeout(res, time); });

/**
 * @api {get} /scripts/cron Start one minute scripts
 * @apiName oneMinuteScripts
 * @apiGroup Cron
 *
 * @apiParam {Array} validAccs accounts to run the scripts for
 *
 * Run the one-minute scripts in first-come order
 * 3 requests to Google per pass every 2.0 seconds
 * 90 requests per minute to Google
 * CRON every 1 min
 */
export const startOneMinuteScriptsController = async (req, res) => {
  const { validAccs } = req.body;

  if (validAccs?.length === 0) {
    return res.status(400).end('zero validAccs');
  }

  const requests = validAccs.map(async (acc, index) => {
    try {
      const timeToSleep = index * 10000;
      await sleep(timeToSleep);

      console.log(`started oms ${acc.title} delay: ${timeToSleep} order:${index}} `);

      await oneMinuteTableScripts(acc);
    } catch (err) {
      console.log(`Error to start one-minute scripts at account: ${acc.title} Message: ${err.message}`);
    } return null;
  });

  Promise.all(requests)
    .then(() => {
      res.status(200).json({ message: `Loading of one-minute scripts is done for ${validAccs.length} accounts` });
    })
    .catch((error) => handleServerError(res, error));
};
