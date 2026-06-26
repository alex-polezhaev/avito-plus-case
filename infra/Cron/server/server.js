/* eslint-disable no-new */
import { CronJob } from 'cron';
import { api } from './api/index.js';
import { addValidateMarks } from './service/validAccs.js';

// Schedule one-minute-script upload jobs for valid accounts
const cronOneMinutesScripts = () => {
  try {
    new CronJob(
      '0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,45,48,50,52,54,56,58 * * * *',
      async () => {
        const accsArray = await api('mongo')
          .get('/accounts')
          .then(({ data }) => data);
        // If the subscription is paid
        const markedAccs = await addValidateMarks([...accsArray]);

        const validAccs = markedAccs.filter((acc) => {
          const { valid_by_date } = acc;
          if (!valid_by_date) {
            console.log(
              `Not valid by payment in oneMinutesScripts ${acc.title}`
            );
            return false;
          }
          console.log(`Passed validation oneMinutesScripts ${acc.title}`);
          return true;
        });
        api('google')
          .put('scripts/cron', { validAccs })
          .catch((error) => console.log(error.response.data));
      },
      null,
      true,
      'Europe/Moscow'
    );
  } catch (error) {
    console.log(error);
  }
};
// cronOneMinutesScripts();

// Schedule jobs to save Avito statistics
const cronAvitoSave = () => {
  try {
    new CronJob(
      '0,10,20,30,40,50 * * * *',
      async () => {
        const accsArray = await api('mongo')
          .get('/accounts')
          .then(({ data }) => data);
        // If the subscription is paid
        const markedAccs = await addValidateMarks([...accsArray]);

        const validAccs = markedAccs.filter((acc) => {
          if (!acc.valid_by_date || !acc.valid_by_avito) {
            return false;
          }
          console.log(`Passed validation cronAvitoSave ${acc.title}`);
          return true;
        });

        api('avito')
          .put('cron/save_report_and_stat_to_mongo', { validAccs })
          .catch((error) => console.log(error));
      },
      null,
      true,
      'Europe/Moscow'
    );
  } catch (error) {
    console.log(error);
  }
};
cronAvitoSave();

// // Schedule subscription auto-renewal jobs
// new CronJob(
//   '* * * * * *',
//   (async () => {
//     const accounts = await api('mongo').get('/accounts_ready_to_renew');
//     api('google').get('cron/auto_renew_subscribtion', accounts);
//   }),
//   null,
//   true,
//   'Europe/Moscow',
// );
