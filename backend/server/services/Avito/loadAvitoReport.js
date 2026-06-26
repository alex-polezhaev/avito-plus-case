import axios from 'axios';
import avitoAuth from './authAvito.js';
import { formatDateDMYHM, plusHours } from '../Date/index.js';
import detailedStatuses from './sections.js';

const avitoApiDomain = 'https://api.avito.ru';

/**
 * getLastAvitoReport
 * Fetches the most recent completed autoload report (falls back to the
 * penultimate one if the latest is still processing).
 */
const getLastAvitoReport = (token) => {
  const url = `${avitoApiDomain}/autoload/v2/reports?per_page=2`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data.reports)
    .then((reports) => {
      const [lastReport, penultimateReport] = reports;
      return lastReport.status !== 'processing' ? lastReport : penultimateReport;
    })
    .catch((error) => {
      const { status, statusText, data } = error.response;
      const { message } = data.result;
      throw new Error(`Can't get all avito reports - ${message}. Status - ${status}, ${statusText}.`);
    });
};

/**
 * getAllAdsByReport
 * Pages through and collects every ad of the given autoload report.
 */
const getAllAdsByReport = async (token, reportID) => {
  const ads = [];
  let currPage = 0;
  const iter = async () => {
    const url = `${avitoApiDomain}/autoload/v2/reports/${reportID}/items?per_page=200&page=${currPage}`;
    await axios.get(url, {
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
        throw new Error(`Can't get all ads by report - ${message}. Status - ${status}, ${statusText}.`);
      });
  };
  await iter();
  return ads;
};

/**
 * prepareReport
 * Normalizes raw ad data into a lookup keyed by ad id, mapping Avito status
 * codes to human-readable, emoji-prefixed labels.
 */
const prepareReport = (ads, finishTime) => {
  const report = {};
  const validFinishTime = formatDateDMYHM(plusHours(finishTime, 3));
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

    const statuses = {
      active: '✅ Active',
      old: null,
      blocked: '⛔️ Blocked',
      rejected: '⛔️ Rejected',
      archived: '🗂️ Archived',
      removed: '🗑️ Removed',
    };
    const sections = {
      stopped_end_date_complete: '⌛️ Expired',
      date_in_future: '🕑 Pending',
    };
    let validStatus = statuses[adStatus];
    if (!validStatus) {
      validStatus = sections[section.slug] ?? `Error: undefined status - ${adStatus}, ${section.slug}`;
    }

    const avitoDateEndFormated = formatDateDMYHM(plusHours(avitoDateEnd, 3));

    report[adID] = {
      avitoID,
      url,
      messages,
      avitoDateEnd: avitoDateEndFormated === 'Invalid Date' ? '' : avitoDateEndFormated,
      adStatus: validStatus,
      finishTime: validFinishTime === 'Invalid Date' ? 'No date' : validFinishTime,
      section: section.slug,
    };
  });
  return report;
};

/**
 * createValidMessages
 * Formats the per-ad notification messages into a single readable block.
 */
const createValidMessages = (messages, section) => {
  const staticPartOfMessageName = 'Notification #';
  const newMessages = messages.map((message, index) => {
    const {
      code,
      title,
      description,
      updated_at: updatedAt,
      type,
    } = message;
    const messageName = `${staticPartOfMessageName}${index + 1}`;
    return `${messageName}\n\nCode: ${code}\nTitle: ${title}\nDescription: ${description}\nUpdated at: ${formatDateDMYHM(updatedAt)}\nType: ${type}`;
  });
  const detailedStatus = `Detailed status: ${detailedStatuses[section]}`;
  return `ℹ️ Notifications\n\n${detailedStatus}\n\n${newMessages.join('\n---------------------\n\n')}`;
};

/**
 * createValidCols
 * Transposes the report back onto the spreadsheet columns, aligning each row by
 * ad id (the first two cells of every column are header/title rows).
 */
const createValidCols = (values, reports) => {
  const neccessaryColNames = [
    'Id',
    'AvitoStatus',
    'AvitoIdStat',
    'AvitoDateEnd',
    'Url',
    'Messages',
    'AutoloadFinishedAt',
  ];
  const neccessaryCols = {};
  values.forEach((value) => {
    const [currentColName] = value;
    if (neccessaryColNames.includes(currentColName)) {
      neccessaryCols[currentColName] = value;
    }
  });

  const {
    Id: ids,
    AvitoStatus,
    AvitoIdStat,
    AvitoDateEnd,
    Url,
    Messages,
    AutoloadFinishedAt,
  } = neccessaryCols;

  const statuses = [AvitoStatus[0], AvitoStatus[1]];
  const avitoIds = [AvitoIdStat[0], AvitoIdStat[1]];
  const ends = [AvitoDateEnd[0], AvitoDateEnd[1]];
  const urls = [Url[0], Url[1]];
  const arrOfmessages = [Messages[0], Messages[1]];
  const autoloadFinishTimes = [AutoloadFinishedAt[0], AutoloadFinishedAt[1]];

  ids.forEach((id, index) => {
    if (index <= 1) return;
    const report = reports[id] ? reports[id] : {
      avitoID: '',
      url: '',
      messages: [],
      avitoDateEnd: '',
      adStatus: '',
      finishTime: '',
    };
    const {
      avitoID,
      url,
      messages,
      avitoDateEnd,
      adStatus,
      finishTime,
      section,
    } = report;
    statuses.push(adStatus);
    avitoIds.push(avitoID);
    ends.push(avitoDateEnd);
    urls.push(url);

    const newMessages = messages.length ? createValidMessages(messages, section) : '*️⃣ No notifications';
    arrOfmessages.push(id.trim() ? newMessages : '');

    autoloadFinishTimes.push(finishTime === '' ? null : finishTime);
  });

  return {
    [statuses[0]]: statuses,
    [avitoIds[0]]: avitoIds,
    [ends[0]]: ends,
    [urls[0]]: urls,
    [arrOfmessages[0]]: arrOfmessages,
    [autoloadFinishTimes[0]]: autoloadFinishTimes,
  };
};

/**
 * loadAvitoReport
 * Main entry point: fetches the latest Avito autoload report and merges it into
 * the spreadsheet column data.
 */
const loadAvitoReport = async (values, data) => {
  try {
    const {
      clientID,
      clientSecret,
    } = data;
    const token = await avitoAuth(clientID, clientSecret);
    const lastReport = await getLastAvitoReport(token);
    const { finished_at: finishTime, id: reportID } = lastReport;
    const ads = await getAllAdsByReport(token, reportID);
    const report = prepareReport(ads, finishTime);
    const validCols = createValidCols(values, report);
    const newValues = values.map((value) => {
      const [currentColName] = value;
      if (validCols[currentColName] !== undefined) {
        return validCols[currentColName];
      }
      return value;
    });
    return newValues;
  } catch (error) {
    console.error(error);
    console.error('Error in loadAvitoReport');
    return values;
  }
};

export default loadAvitoReport;
