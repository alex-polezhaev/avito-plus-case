/* eslint-disable no-await-in-loop */
/* eslint-disable brace-style */
/* eslint-disable no-extra-boolean-cast */
import { formatDateDMYHM, setDate } from './Date/index.js';
import updateTableData from './Google/index.js';
import { updateSpecBySheetIdAndAccId } from './Mongoose/specsDB.js';
import randomizeString from './Randomizer/randomizeString.js';
import { getImageLinks } from './Yandex/getImageLinks.js';
import mintId from './Randomizer/mintId.js';
import { largestCol, tableColumnsToObject } from './tableUtils.js';

// Treat a single/double space or a newline as "empty".
const BOOL = (tag) => Boolean(tag === ' ' || tag === '  ' || tag === '\n' ? '' : tag);

export const oneMinuteTableScripts = async (acc) => {
  const action = async (values) => {
    // Source snapshot for comparison
    const A = tableColumnsToObject(values, true);

    // Working copy to mutate
    const C = tableColumnsToObject(values, true);

    // Current iteration counter used to stagger the image-loading jobs
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

      // Yandex.Disk images
      if (!BOOL(C.Images[i]) && BOOL(C.ImageFolder[i]) && acc.yandex_token.token && iterIMG < 100) {
        const sleep = (iterIMG + 1) * 400;
        C.Images[i] = getImageLinks(acc, C.ImageFolder[i], sleep);
        iterIMG += 1;
      }

      if (BOOL(C.AvitoStatus[i]) && BOOL(C.Id[i])) {
        // Count statuses: active, expired, pending, etc.
        if (C.Id[i]) { stat.total_ads += 1; }

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
        if (C.AvitoStatus[i].includes('Removed')) {
          stat.deleted_ads += 1;
        }
        if (C.AvitoStatus[i].includes('Pending')
        || C.AvitoStatus[i].includes('Updated')) {
          stat.waiting_ads += 1;
        }

        // Views, contacts and favorites (1 day)
        if (BOOL(C.UniqViews1[i]) && +C.UniqViews1[i]) {
          stat.views1 += +C.UniqViews1[i];
        }
        if (BOOL(C.UniqContacts1[i]) && +C.UniqContacts1[i]) {
          stat.messages1 += +C.UniqContacts1[i];
        }
        if (BOOL(C.UniqFavorites1[i]) && +C.UniqFavorites1[i]) {
          stat.likes1 += +C.UniqFavorites1[i];
        }

        // Views, contacts and favorites (7 days)
        if (BOOL(C.UniqViews7[i]) && +C.UniqViews7[i]) {
          stat.views7 += +C.UniqViews7[i];
        }
        if (BOOL(C.UniqContacts7[i]) && +C.UniqContacts7[i]) {
          stat.messages7 += +C.UniqContacts7[i];
        }
        if (BOOL(C.UniqFavorites7[i]) && +C.UniqFavorites7[i]) {
          stat.likes7 += +C.UniqFavorites7[i];
        }

        // Views, contacts and favorites (30 days)
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

      // Re-publish blocked listings.
      // If the rule is enabled, a status exists and contains "Blocked", and the
      // randomizer template is filled in.
      if (acc.automatic.renew_blocked
      && BOOL(C.AvitoStatus[i])
      && C.AvitoStatus[i].includes('Blocked')
      && BOOL(C.DescriptionRandom[i])) {
        // Mint a new id
        C.Id[i] = mintId();

        // Update the status
        C.AvitoStatus[i] = '🤖 Updated';

        // Update the start date
        C.DateBegin[i] = formatDateDMYHM(new Date()).replace(',', '');

        // Update the end date
        C.DateEnd[i] = formatDateDMYHM(setDate(30)).replace(',', '');

        // Update the description
        C.Description[i] = randomizeString(C.DescriptionRandom[i], C, i);

        // Update the title if a randomizer template exists (optional)
        if (BOOL(C.TitleRandom[i])) {
          C.Title[i] = randomizeString(C.TitleRandom[i], C, i);
        }
      }

      // Re-publish expired listings.
      // If the rule is enabled and a status exists and contains "Expired".
      if (acc.automatic.renew_old
        && BOOL(C.AvitoStatus[i])
        && C.AvitoStatus[i].includes('Expired')) {
        // Mint a new id
        C.Id[i] = mintId();

        // Update the status
        C.AvitoStatus[i] = '🤖 Updated';

        // Update the start date
        C.DateBegin[i] = formatDateDMYHM(new Date()).replace(',', '');

        // Update the end date
        C.DateEnd[i] = formatDateDMYHM(setDate(30)).replace(',', '');
      }
    }

    // Wait for the images to finish loading
    C.Images = await Promise.all(C.Images);

    // Persist statistics to the database
    if (C.SheetID[1]) {
      updateSpecBySheetIdAndAccId(C.SheetID[1], acc._id, { stat });
    }

    // If a value did not change, set it to null so it is not re-written
    for (let i = 0; i < A.Title.length; i += 1) {
      Object.keys(A).forEach((tag) => {
        if (C[tag][i] === A[tag][i] || !C[tag][i])
        { C[tag][i] = null; }
      });
    }

    return Object.values(C);
  };

  return updateTableData(acc.table_id, action);
};
