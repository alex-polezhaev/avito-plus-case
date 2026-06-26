import axios from 'axios';
import { DateTime } from 'luxon';
import detailedStatuses from './sections.js';

/**
 * @module Avito
 * @file Function for loading the Avito report
 */

export const formatDateDMYHM = (nonFormatDate) => new Date(nonFormatDate).toLocaleString('RU', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const plusHours = (date, hours) => new Date(new Date(date)
  .setHours(new Date().getHours() + hours));

const avitoApiDomen = 'https://api.avito.ru';

/**
 * @async
 * @function getLastAvitoReport
 * @param {String} token Avito token
 * @returns {Object} The latest upload report. Example: {
      "finished_at": "2019-08-24T14:15:22Z",
      "id": 0,
      "started_at": "2019-08-24T14:15:22Z",
      "status": "processing"
    }
 * @description Function for fetching the latest autoload report
 * @see https://developers.avito.ru/api-catalog/autoload/documentation#operation/getReportsV2
 */

export const getLastAvitoReport = (token) => {
  const url = `${avitoApiDomen}/autoload/v2/reports?per_page=10`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data.reports)
    .then((reports) => {
      let result;

      for (let i = 0; i < reports.length; i += 1) {
        if (reports[i].finished_at && reports[i].status !== 'error') {
          result = reports[i];
          break;
        }
      }

      return result;
    })
    .catch((error) => {
      throw new Error(
        `Can't get all avito reports - ${JSON.stringify(error)}`,
      );
    });
};

/**
 * @async
 * @function getAllAdsByReport
 * @param {String} token Avito token
 * @param {String} reportID Report ID
 * @returns {Array} All ads from a specific upload. Example: [
    {
      "ad_id": "string",
      "applied_vas": [
        {
          "price": 0,
          "slug": "xl",
          "title": "string"
        }
      ],
      "avito_date_end": "string",
      "avito_id": 0,
      "avito_status": "active",
      "messages": [
        {
          "code": 0,
          "description": "string",
          "title": "string",
          "type": "error",
          "updated_at": "2019-08-24T14:15:22Z"
        }
      ],
      "section": {
        "slug": "string",
        "title": "string"
      },
      "url": "string"
    }
  ]
 * @description Function for fetching all ads of the latest autoload report
 * @see https://developers.avito.ru/api-catalog/autoload/documentation#operation/getReportItemsById
 */

export const getAllAdsByReport = async (token, reportID) => {
  const ads = [];
  let currPage = 0;
  const iter = async () => {
    const url = `${avitoApiDomen}/autoload/v2/reports/${reportID}/items?per_page=200&page=${currPage}`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data.items)
      .then(async (items) => {
        if (!items) return;
        ads.push(...items);
        currPage += 1;
        await iter();
      })
      .catch((error) => {
        const { status, statusText, data } = error.response;
        const { message } = data.result;
        throw new Error(
          `Can't get all ads by report - ${message}. Status - ${status}, ${statusText}.`,
        );
      });
  };
  await iter();
  return ads;
};

/**
 * @function createValidMessages
 * @param {Array} messages Messages
 * @param {String} section The section the ad is in
 * (Section is an Avito term, see {@link sections})
 * @returns {String} The messages array reformatted into a single string
 * @description Function for formatting messages
 */

const createValidMessages = (messages, section) => {
  const staticPartOfMessageName = 'Notification #';
  const newMessages = messages.map((message, index) => {
    const {
      code, title, description, updated_at: updatedAt, type,
    } = message;
    const messageName = `${staticPartOfMessageName}${index + 1}`;
    return `${messageName}\n\nCode: ${code}\nTitle: ${title}\nDescription: ${description}\nUpdated at: ${formatDateDMYHM(
      updatedAt,
    )}\nType: ${type}`;
  });
  const detailedStatus = `Detailed status: ${detailedStatuses[section]}`;
  return `ℹ️ Notifications\n\n${detailedStatus}\n\n${newMessages.join(
    '\n---------------------\n\n',
  )}`;
};

const createValidStatus = (adStatus, section) => {
  const statuses = {
    active: '✅ Active',
    old: null,
    blocked: '⛔️ Blocked',
    rejected: '⛔️ Rejected',
    archived: '🗂️ Archived',
    removed: '🗑️ Deleted',
  };
  const sections = {
    stopped_end_date_complete: '⌛️ Expired',
    date_in_future: '🕑 Pending',
    error_params: '⛔️ Rejected',
    error_fee_hard_limit: '⛔️ Rejected',
    error_other: '⛔️ Rejected',
    success_skipped: '✅ Active',
    need_sync: '⌛️ Expired',
    stopped_by_expiration: '⌛️ Expired',
    problem_images: '✅ Active',
  };
  let validStatus = statuses[adStatus];
  if (!validStatus) {
    validStatus = sections[section.slug]
      ?? `Error: status is undefined - ${adStatus}, ${section.slug}`;
  }
  return validStatus;
};

export const formatReport = (ads, finishedAt) => {
  const result = {};
  ads.forEach((ad) => {
    const {
      section,
      ad_id: adID,
      avito_id: avitoID,
      url,
      messages,
      avito_date_end: avitoDateEnd,
      avito_status: adStatus,
    } = ad;
    const validStatus = createValidStatus(adStatus, section);
    const validMessages = messages.length
      ? createValidMessages(messages, section.slug)
      : '*️⃣ No notifications';

    const avitoDateEndFormated = DateTime.fromISO(avitoDateEnd)
      .setZone('Europe/Moscow')
      .setLocale('RU')
      .toFormat('D T');
    const finishedAtFormated = DateTime.fromISO(finishedAt)
      .setZone('Europe/Moscow')
      .setLocale('RU')
      .toFormat('D T');

    result[adID] = {
      AvitoStatus: validStatus,
      AvitoIdStat: avitoID || 'No ID',
      AvitoDateEnd:
        avitoDateEndFormated === 'Invalid DateTime'
          ? 'No date'
          : `'${avitoDateEndFormated}`,
      Url: url || 'No link',
      Messages: adID.trim() ? validMessages : '',
      AutoloadFinishedAt:
        finishedAtFormated === 'Invalid DateTime'
          ? 'No date'
          : `'${finishedAtFormated}`,
    };
  });
  return result;
};

/**
 * @see https://developers.avito.ru/api-catalog/item/documentation#operation/itemStatsShallow
 */

export const getAvitoStatItems = async (token, acc) => {
  const dateTo = DateTime.now()
    .set({
      hour: 0,
      minutes: 0,
      second: 0,
      millisecond: 0,
    })
    .toFormat('yyyy-MM-dd');

  const dateFrom = DateTime.now()
    .set({
      hour: 0,
      minutes: 0,
      second: 0,
      millisecond: 0,
    })
    .minus({ days: 269 })
    .toFormat('yyyy-MM-dd');

  return axios
    .post(
      `${avitoApiDomen}/stats/v1/accounts/${acc.avito.id}/items`,
      {
        dateTo,
        dateFrom,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then(({ data }) => data.result.items);
};
const blankObj = {
  UniqContacts270: 0,
  UniqFavorites270: 0,
  UniqViews270: 0,
  CV270: 0,
  UniqContacts30: 0,
  UniqFavorites30: 0,
  UniqViews30: 0,
  CV30: 0,
  UniqContacts7: 0,
  UniqFavorites7: 0,
  UniqViews7: 0,
  CV7: 0,
  UniqContacts1: 0,
  UniqFavorites1: 0,
  UniqViews1: 0,
  CV1: 0,
};

export const formatAvitoStat = (avitoStat, reportAds) => {
  const groupedData = [...avitoStat];

  // Determine timestamps
  const today = DateTime.now().set({
    hour: 0,
    minutes: 0,
    second: 0,
    millisecond: 0,
  });
  const sevenDaysAgo = DateTime.now().minus({ days: 7 });
  const monthDaysAgo = DateTime.now().minus({ month: 1 });
  const yearAgo = DateTime.now().minus({ year: 1 });

  // iterate over each ad
  avitoStat.forEach((item, i) => {
    const { stats } = item;

    groupedData[i].groupedStat = { ...blankObj };

    const grouped = groupedData[i].groupedStat;

    // iterate over the per-day statistics objects
    stats.forEach((stat) => {
      const compareDate = DateTime.fromISO(stat.date);

      if (+compareDate === +today) {
        grouped.UniqContacts1 += stat.uniqContacts;
        grouped.UniqFavorites1 += stat.uniqFavorites;
        grouped.UniqViews1 += stat.uniqViews;

        grouped.CV1 = grouped.UniqContacts1 === 0
          ? 0
          : Math.round(100 / (grouped.UniqViews1 / grouped.UniqContacts1));
      } else if (compareDate > today) {
        console.log('Avito returned a statistics date in the future');
      } else if (compareDate > sevenDaysAgo) {
        grouped.UniqContacts7 += stat.uniqContacts;
        grouped.UniqFavorites7 += stat.uniqFavorites;
        grouped.UniqViews7 += stat.uniqViews;

        grouped.CV7 = grouped.UniqContacts7 === 0
          ? 0
          : Math.round(100 / (grouped.UniqViews7 / grouped.UniqContacts7));
      } else if (compareDate > monthDaysAgo) {
        grouped.UniqContacts30 += stat.uniqContacts;
        grouped.UniqFavorites30 += stat.uniqFavorites;
        grouped.UniqViews30 += stat.uniqViews;

        grouped.CV30 = grouped.UniqContacts30 === 0
          ? 0
          : Math.round(100 / (grouped.UniqViews30 / grouped.UniqContacts30));
      } else if (compareDate > yearAgo) {
        grouped.UniqContacts270 += stat.uniqContacts;
        grouped.UniqFavorites270 += stat.uniqFavorites;
        grouped.UniqViews270 += stat.uniqViews;

        grouped.CV270 = grouped.UniqContacts270 === 0
          ? 0
          : Math.round(
            100 / (grouped.UniqViews270 / grouped.UniqContacts270),
          );
      }
    });
  });

  // Map Avito ids to autoload ids
  const mapedIds = reportAds.reduce((acc, item) => {
    acc[item.avito_id] = item.ad_id;
    return acc;
  }, {});

  // Convert (map) into the required format
  return groupedData.reduce((acc, item) => {
    if (mapedIds[item.itemId]) {
      acc[mapedIds[item.itemId]] = { ...item.groupedStat };
    }
    return acc;
  }, {});
};
