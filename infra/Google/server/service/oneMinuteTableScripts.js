/* eslint-disable no-await-in-loop */
/* eslint-disable brace-style */
/* eslint-disable no-extra-boolean-cast */
import { customAlphabet } from 'nanoid';
import { DateTime } from 'luxon';
import axios from 'axios';
import { formatDateDMYHM, setDate } from '../addons/index.js';
import updateTableData from './updateTableData.js';
import randomizeString from '../addons/randomizeString.js';
import { api } from '../api/index.js';
import { parseSheetDate } from './helpers/parseSheetDate.js';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);

// Build an object for quick column access
const makeObjectUsingTableData = (array) => {
  const tableObject = {};
  array.forEach((column) => {
    tableObject[column[0]] = [...column];
  });
  return tableObject;
};

// Determine the longest column in the spreadsheet
const largestCol = (values) => {
  let result = 0;
  values.forEach((col) => {
    if (col.length > result) {
      result = col.length;
    }
  });
  return result;
};

// Normalize single and double spaces
const BOOL = (tag) => Boolean(tag === ' ' || tag === '  ' || tag === '\n' ? '' : tag);

export const oneMinuteTableScripts = async (acc) => {
  const action = async (values) => {
    // Source for comparison
    const A = makeObjectUsingTableData(values);

    // Object to modify
    const C = makeObjectUsingTableData(values);

    let REP = null;
    let STAT = null;

    if (acc?.avito?.id) {
      // Avito report object
      REP = await api('avito')
        .get(`/report/${acc._id}`)
        .then(({ data }) => data)
        .catch(() => null);

      // Avito stat object
      STAT = await api('avito')
        .get(`/stat/${acc._id}`)
        .then(({ data }) => data)
        .catch(() => null);
    }

    let SLIDE_TASKS = null;

    // Returns an object of slide tasks id:task
    SLIDE_TASKS = await api('mongo')
      .get(`/tasks/slides/${acc._id}`)
      .then(({ data }) => {
        if (data.length > 0) {
          return data.reduce((acumTasks, task) => {
            const { ad_id } = task;
            // eslint-disable-next-line no-param-reassign
            acumTasks[ad_id] = task;
            return acumTasks;
          }, {});
        }
        return null;
      })
      .catch(() => null);

    // Used to find old statistics
    const yesterday = DateTime.now()
      .setZone('Europe/Moscow')
      .minus({ days: 1 });

    // Used to compare against the exact end date
    const nowTime = DateTime.now().setZone('Europe/Moscow');

    // Current iteration used to compute the start time of photo tasks
    let iterIMG = 0;

    // Statistics accumulator
    const stat = {
      total_ads: 0,
      active_ads: 0,
      old_ads: 0,
      blocked_ads: 0,
      rejected_ads: 0,
      archived_ads: 0,
      deleted_ads: 0,
      waiting_ads: 0,
      views1: 0,
      messages1: 0,
      likes1: 0,
      views7: 0,
      messages7: 0,
      likes7: 0,
      views30: 0,
      messages30: 0,
      likes30: 0,
    };

    for (let i = 2; i < largestCol(values); i += 1) {
      // Randomizer - Title
      if (!BOOL(C.Title[i]) && BOOL(C.TitleRandom[i])) {
        C.Title[i] = randomizeString(C.TitleRandom[i], C, i);
      }

      // Randomizer - Description
      if (!BOOL(C.Description[i]) && BOOL(C.DescriptionRandom[i])) {
        C.Description[i] = randomizeString(C.DescriptionRandom[i], C, i);
      }

      // Randomizer - Price
      if (!BOOL(C.Price[i]) && BOOL(C.PriceRandom[i])) {
        C.Price[i] = randomizeString(C.PriceRandom[i], C, i);
      }

      // Yandex Disk
      if (
        !BOOL(C.Images[i])
        && BOOL(C.ImageFolder[i])
        && acc?.yandex_token?.token
        && iterIMG < 200
      ) {
        const sleep = (iterIMG + 1) * 300;
        C.Images[i] = api('yandex')
          .put('/folder/images', {
            acc,
            ImageFolder: C.ImageFolder[i],
            sleep,
          })
          .then(({ data }) => {
            if (C.Collage && BOOL(C.Collage[i])) {
              const newCollageArr = C.Collage[i].split('\n').map((collage) => {
                if (collage.includes('*')) {
                  const [url] = collage.split('*');
                  return `${url}*${nanoid(8)}`;
                }
                return collage;
              });

              return `${data}\n${newCollageArr.join('\n')}`;
            }
            return data;
          })
          .then((str) => {
            const linkArray = str.split('\n');
            linkArray.forEach((link) => {
              const newLink = link.replace(
                'https://your-domain.example',
                'http://validator:3000',
              );

              axios.get(newLink).catch(() => {});
            });

            return str;
          });
        iterIMG += 1;
      }

      // Total number of ads in the spreadsheet
      if (C.Id[i]) {
        stat.total_ads += 1;
      }

      if (BOOL(C.AvitoStatus[i]) && BOOL(C.Id[i])) {
        // Record statistics: active, expired, pending, etc.

        if (C.AvitoStatus[i].includes('Active')) {
          stat.active_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Expired')) {
          stat.old_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Blocked')) {
          stat.blocked_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Rejected')) {
          stat.rejected_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Archived')) {
          stat.archived_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Deleted')) {
          stat.deleted_ads += 1;
        }
        if (
          C.AvitoStatus[i].includes('Pending')
          || C.AvitoStatus[i].includes('Updated')
        ) {
          stat.waiting_ads += 1;
        }

        // Record views/likes/messages statistics (1 day)
        if (BOOL(C.UniqViews1[i]) && +C.UniqViews1[i]) {
          stat.views1 += +C.UniqViews1[i];
        }
        if (BOOL(C.UniqContacts1[i]) && +C.UniqContacts1[i]) {
          stat.messages1 += +C.UniqContacts1[i];
        }
        if (BOOL(C.UniqFavorites1[i]) && +C.UniqFavorites1[i]) {
          stat.likes1 += +C.UniqFavorites1[i];
        }

        // Record views/likes/messages statistics (7 days)
        if (BOOL(C.UniqViews7[i]) && +C.UniqViews7[i]) {
          stat.views7 += +C.UniqViews7[i];
        }
        if (BOOL(C.UniqContacts7[i]) && +C.UniqContacts7[i]) {
          stat.messages7 += +C.UniqContacts7[i];
        }
        if (BOOL(C.UniqFavorites7[i]) && +C.UniqFavorites7[i]) {
          stat.likes7 += +C.UniqFavorites7[i];
        }

        // Record views/likes/messages statistics (30 days)
        if (BOOL(C.UniqViews30[i]) && +C.UniqViews30[i]) {
          stat.views30 += +C.UniqViews30[i];
        }
        if (BOOL(C.UniqContacts30[i]) && +C.UniqContacts30[i]) {
          stat.messages30 += +C.UniqContacts30[i];
        }
        if (BOOL(C.UniqFavorites30[i]) && +C.UniqFavorites30[i]) {
          stat.likes30 += +C.UniqFavorites30[i];
        }
      }

      // Republish blocked ads
      /* If the rule is enabled, the ad status exists and contains "Blocked",
      and the randomizer template is filled in */
      if (
        acc.automatic.renew_blocked
        && BOOL(C.AvitoStatus[i])
        && C.AvitoStatus[i].includes('Blocked')
        && BOOL(C.DescriptionRandom[i])
      ) {
        // Create a new id
        C.Id[i] = nanoid();

        // Update the status
        C.AvitoStatus[i] = '🤖 Updated';

        // Change the start date
        C.DateBegin[i] = formatDateDMYHM(new Date()).replace(',', '');

        // Change the end date
        C.DateEnd[i] = formatDateDMYHM(setDate(30)).replace(',', '');

        // Change the description
        C.Description[i] = randomizeString(C.DescriptionRandom[i], C, i);

        // Change the title if a randomizer is present (optional)
        if (BOOL(C.TitleRandom[i])) {
          C.Title[i] = randomizeString(C.TitleRandom[i], C, i);
        }

        // Reload the photos
        C.Images[i] = '';
      }

      // Republish expired ads
      /* If the rule is enabled, the ad status exists and contains "Blocked",
      and the randomizer template is filled in */
      if (
        acc.automatic.renew_old
        && BOOL(C.AvitoStatus[i])
        && C.AvitoStatus[i].includes('Expired')
      ) {
        // Create a new id
        C.Id[i] = nanoid();

        // Update the status
        C.AvitoStatus[i] = '🤖 Updated';

        // Change the start date
        C.DateBegin[i] = formatDateDMYHM(new Date()).replace(',', '');

        // Change the end date
        C.DateEnd[i] = formatDateDMYHM(setDate(30)).replace(',', '');
      }

      // Republish expired and pending ads with an end-date check
      /* If the rule is enabled, the ad status exists and contains "Blocked" or "Pending",
      the randomizer template is filled in and the exact end date is in the past */
      if (
        acc.automatic.renew_old_strict
        && BOOL(C.AvitoStatus[i])
        && (C.AvitoStatus[i].includes('Expired')
          || C.AvitoStatus[i].includes('Pending'))
        && BOOL(C.AvitoDateEnd[i])
        && DateTime.fromFormat(C.AvitoDateEnd[i], 'dd.MM.yyyy h:mm', {
          zone: 'Europe/Moscow',
        }) < nowTime
        && BOOL(C.DateEnd[i])
        && parseSheetDate(C.DateEnd[i]) < nowTime
      ) {
        // Create a new id
        C.Id[i] = nanoid();

        // Update the status
        C.AvitoStatus[i] = '🤖 Updated';

        // Change the start date
        C.DateBegin[i] = formatDateDMYHM(new Date()).replace(',', '');

        // Change the end date
        C.DateEnd[i] = formatDateDMYHM(setDate(30)).replace(',', '');
      }

      // Clear statistics older than 1 day
      if (
        BOOL(C.AvitoStatus[i])
        && BOOL(C.AutoloadFinishedAt[i])
        && DateTime.fromFormat(C.AutoloadFinishedAt[i], 'dd.MM.yyyy h:mm', {
          zone: 'Europe/Moscow',
        }) < yesterday
      ) {
        if (BOOL(C.AvitoStatus[i])) {
          C.AvitoStatus[i] = '';
        }
        if (BOOL(C.AvitoIdStat[i])) {
          C.AvitoIdStat[i] = '';
        }
        if (BOOL(C.AvitoDateEnd[i])) {
          C.AvitoDateEnd[i] = '';
        }
        if (BOOL(C.Url[i])) {
          C.Url[i] = '';
        }
        if (BOOL(C.Messages[i])) {
          C.Messages[i] = '';
        }
        if (BOOL(C.AutoloadFinishedAt[i])) {
          C.AutoloadFinishedAt[i] = '';
        }

        if (BOOL(C.UniqViews270[i])) {
          C.UniqViews270[i] = '';
        }
        if (BOOL(C.UniqContacts270[i])) {
          C.UniqContacts270[i] = '';
        }
        if (BOOL(C.CV270[i])) {
          C.CV270[i] = '';
        }
        if (BOOL(C.UniqFavorites270[i])) {
          C.UniqFavorites270[i] = '';
        }

        if (BOOL(C.UniqViews30[i])) {
          C.UniqViews30[i] = '';
        }
        if (BOOL(C.UniqContacts30[i])) {
          C.UniqContacts30[i] = '';
        }
        if (BOOL(C.CV30[i])) {
          C.CV30[i] = '';
        }
        if (BOOL(C.UniqFavorites30[i])) {
          C.UniqFavorites30[i] = '';
        }

        if (BOOL(C.UniqViews7[i])) {
          C.UniqViews7[i] = '';
        }
        if (BOOL(C.UniqContacts7[i])) {
          C.UniqContacts7[i] = '';
        }
        if (BOOL(C.CV7[i])) {
          C.CV7[i] = '';
        }
        if (BOOL(C.UniqFavorites7[i])) {
          C.UniqFavorites7[i] = '';
        }

        if (BOOL(C.UniqViews1[i])) {
          C.UniqViews1[i] = '';
        }
        if (BOOL(C.UniqContacts1[i])) {
          C.UniqContacts1[i] = '';
        }
        if (BOOL(C.CV1[i])) {
          C.CV1[i] = '';
        }
        if (BOOL(C.UniqFavorites1[i])) {
          C.UniqFavorites1[i] = '';
        }
      }

      // Load the Avito report
      if (BOOL(REP) && BOOL(C.Id[i]) && BOOL(REP[C.Id[i]])) {
        // id without spaces
        const curr_id = C.Id[i];
        // AvitoStatus column
        C.AvitoStatus[i] = REP[curr_id].AvitoStatus;

        // AvitoStatus column
        C.AvitoIdStat[i] = REP[curr_id].AvitoIdStat;

        // AvitoStatus column
        C.AvitoDateEnd[i] = REP[curr_id].AvitoDateEnd;

        // AvitoStatus column
        C.Url[i] = REP[curr_id].Url;

        // AvitoStatus column
        C.Messages[i] = REP[curr_id].Messages;

        // AvitoStatus column
        C.AutoloadFinishedAt[i] = REP[curr_id].AutoloadFinishedAt;
      }

      // Load the Avito statistics
      if (BOOL(STAT) && BOOL(C.Id[i]) && BOOL(STAT[C.Id[i]])) {
        // id without spaces
        const curr_id = C.Id[i];
        // 270
        C.UniqViews270[i] = STAT[curr_id].UniqViews270;
        C.UniqContacts270[i] = STAT[curr_id].UniqContacts270;
        C.CV270[i] = STAT[curr_id].CV270;
        C.UniqFavorites270[i] = STAT[curr_id].UniqFavorites270;

        // 30
        C.UniqViews30[i] = STAT[curr_id].UniqViews30;
        C.UniqContacts30[i] = STAT[curr_id].UniqContacts30;
        C.CV30[i] = STAT[curr_id].CV30;
        C.UniqFavorites30[i] = STAT[curr_id].UniqFavorites30;

        // 7
        C.UniqViews7[i] = STAT[curr_id].UniqViews7;
        C.UniqContacts7[i] = STAT[curr_id].UniqContacts7;
        C.CV7[i] = STAT[curr_id].CV7;
        C.UniqFavorites7[i] = STAT[curr_id].UniqFavorites7;

        // 1
        C.UniqViews1[i] = STAT[curr_id].UniqViews1;
        C.UniqContacts1[i] = STAT[curr_id].UniqContacts1;
        C.CV1[i] = STAT[curr_id].CV1;
        C.UniqFavorites1[i] = STAT[curr_id].UniqFavorites1;
      }

      // Add 0 to statistics if a report exists
      if (
        (BOOL(C.AvitoStatus[i])
          && BOOL(C.Id[i])
          && !BOOL(C.UniqViews270[i])
          && !BOOL(C.UniqViews30[i])
          && !BOOL(C.UniqViews7[i])
          && !BOOL(C.UniqViews1[i]))
        || (BOOL(C.AvitoStatus[i]) && C.AvitoStatus[i].includes('Updated'))
      ) {
        // 270
        C.UniqViews270[i] = '0';
        C.UniqContacts270[i] = '0';
        C.CV270[i] = '0';
        C.UniqFavorites270[i] = '0';

        // 30
        C.UniqViews30[i] = '0';
        C.UniqContacts30[i] = '0';
        C.CV30[i] = '0';
        C.UniqFavorites30[i] = '0';

        // 7
        C.UniqViews7[i] = '0';
        C.UniqContacts7[i] = '0';
        C.CV7[i] = '0';
        C.UniqFavorites7[i] = '0';

        // 1
        C.UniqViews1[i] = '0';
        C.UniqContacts1[i] = '0';
        C.CV1[i] = '0';
        C.UniqFavorites1[i] = '0';
      }

      // Apply changes from slides
      if (BOOL(C.Id[i]) && SLIDE_TASKS && SLIDE_TASKS[C.Id[i]]) {
        const sheetID = C.SheetID[1];
        const task = SLIDE_TASKS[C.Id[i]];
        if (task.acc_id === acc._id && task.sheet_id === sheetID) {
          Object.keys(task.changes).forEach((col) => {
            C[col][i] = task.changes[col];
          });
        }
      }
    }

    // Wait for the photos to finish loading
    C.Images = await Promise.all(C.Images);

    // Upload statistics to the database
    if (C.SheetID[1]) {
      api('mongo')
        .patch(
          `/update_spec_by_sheet_and_acc_id?sheetID=${C.SheetID[1]}&accID=${acc._id}`,
          { stat },
        )
        .catch((err) => console.error(err));
    }

    // If the value did not change, set null
    for (let i = 0; i < largestCol(values); i += 1) {
      Object.keys(A).forEach((tag) => {
        // Bug fix 0
        if (C[tag][i] === A[tag][i] || (!C[tag][i] && !C[tag][i] === 0)) {
          C[tag][i] = null;
        }
      });
    }

    return Object.values(C);
  };

  // fieldsToChange needs to be adjusted to leave it empty
  return updateTableData(acc.table_id, action, [], { accID: acc._id });
};
