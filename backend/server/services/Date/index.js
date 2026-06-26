import moment from 'moment';
import { getTariffAdsAmount } from '../Payment/tariffFuncs.js';
// eslint-disable-next-line import/no-cycle
import { getAdsAmount } from '../Mongoose/specsDB.js';

const createValidDate = (dateInMS) => {
  const formatDate = new Date(dateInMS).toLocaleString('RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return formatDate;
};

export const formatDateDMYHM = (nonFormatDate) => new Date(nonFormatDate).toLocaleString('RU', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const createValidTodayDate = () => {
  const todayInvalid = Date.now();
  const todayValid = createValidDate(todayInvalid);
  return todayValid;
};

export const createValidTrialPeriod = () => {
  const msIn7Days = 604800000;
  const todayInMS = Date.now();
  const newValidTrialDateInMS = msIn7Days + todayInMS;
  const validTrialPeriod = createValidDate(newValidTrialDateInMS);
  return {
    valid_date: validTrialPeriod,
    valid_dateInMS: newValidTrialDateInMS,
  };
};

export const createNewExpirationDate = (
  oldExpirationDate = { valid_dateInMS: Date.now() },
) => {
  const { valid_dateInMS: validDateInMS } = oldExpirationDate;
  const msIn30Days = 2592000000;
  const newValidDateInMS = msIn30Days + validDateInMS;
  const newValidExpirationDate = createValidDate(newValidDateInMS);
  return {
    valid_date: newValidExpirationDate,
    valid_dateInMS: newValidDateInMS,
  };
};

const convertMsToDays = (ms) => Math.ceil(ms / 86400000);

export const getMonthsLeft = (validDateInMS) => {
  const todayInMS = Date.now();
  const daysLeft = convertMsToDays(validDateInMS - todayInMS);
  const monthsLeft = daysLeft / 30;
  return monthsLeft;
};

export const createValidDateForXML = (value, tag, timezone) => {
  const timezones = {
    'Kaliningrad (- 01:00 from Moscow)': ['+', 1],
    'Moscow (+ 00:00 from Moscow)': ['-', 0],
    'Samara (+ 01:00 from Moscow)': ['-', 1],
    'Yekaterinburg (+ 02:00 from Moscow)': ['-', 2],
    'Omsk (+ 03:00 from Moscow)': ['-', 3],
    'Krasnoyarsk (+ 04:00 from Moscow)': ['-', 4],
    'Irkutsk (+ 05:00 from Moscow)': ['-', 5],
    'Yakutsk (+ 06:00 from Moscow)': ['-', 6],
    'Vladivostok (+ 07:00 from Moscow)': ['-', 7],
    'Magadan (+ 08:00 from Moscow)': ['-', 8],
    'Kamchatka (+ 09:00 from Moscow)': ['-', 9],
  };
  try {
    if (!value) return `<${tag}></${tag}>`;
    const [day, month, rest] = value.split('.');
    const [year, time] = rest.split(' ');
    const [hours, mins] = time ? time.split(':') : [10, 0];
    const [timeDiffSign, timeDiffValue] = timezone
      ? timezones[timezone]
      : ['+', 0];
    const validHours = timeDiffSign === '+' ? +hours + +timeDiffValue : +hours - +timeDiffValue;
    const date = new Date(
      Date.UTC(+year, +month - 1, +day, +validHours, +mins),
    );
    return `<${tag}>${date.toJSON()}</${tag}>`;
  } catch (error) {
    console.error(error);
    console.error("Can't create valid date for XML");
    return `<${tag}></${tag}>`;
  }
};

export const setDate = (days = 7) => new Date(new Date().setDate(new Date().getDate() + days));

export const plusDaysToExpireAt = (expire_at, days = 7) => new Date(new Date(expire_at)
  .setDate(new Date()
    .getDate() + days));

export const plusHours = (date, hours) => new Date(new Date(date)
  .setHours(new Date()
    .getHours() + hours));

export const accValidByDate = (acc) => {
  // Date has not expired
  if (new Date(acc.expire_at) > new Date()) {
    return true;
  }
  return false;
};

export const accValidByAvito = (acc) => {
  const { avito } = acc;

  // Avito id is present
  if (!avito?.id) {
    return false;
  }
  return true;
};

export const accValidByLimit = async (acc) => {
  // Ad limit is not exceeded
  if ((await getAdsAmount(acc._id)) > getTariffAdsAmount(acc.month_price)) {
    return false;
  }
  return true;
};

// Adds validation marks to an array of accounts
export const addValidateMarks = async (accs) => {
  const markedAccs = accs.map(async (acc) => {
    // Date has not expired
    if (new Date(acc.expire_at) > new Date()) {
      acc.valid_by_date = true;
    } else acc.valid_by_date = false;

    // Avito id is present
    if (acc?.avito?.id) {
      acc.valid_by_avito = true;
    } else acc.valid_by_avito = false;

    const adsAmount = await getAdsAmount(acc._id);
    const tariffLimit = getTariffAdsAmount(acc.month_price);

    // Ad limit is not exceeded
    if (adsAmount > tariffLimit) {
      acc.valid_by_limit = false;
    } else acc.valid_by_limit = true;

    return acc;
  });

  return Promise.all(markedAccs);
};

export const XMLTime = (strDate, zone) => {
  const timezones = {
    'Kaliningrad (- 01:00 from Moscow)': +1,
    'Moscow (+ 00:00 from Moscow)': 0,
    'Samara (+ 01:00 from Moscow)': -1,
    'Yekaterinburg (+ 02:00 from Moscow)': -2,
    'Omsk (+ 03:00 from Moscow)': -3,
    'Krasnoyarsk (+ 04:00 from Moscow)': -4,
    'Irkutsk (+ 05:00 from Moscow)': -5,
    'Yakutsk (+ 06:00 from Moscow)': -6,
    'Vladivostok (+ 07:00 from Moscow)': -7,
    'Magadan (+ 08:00 from Moscow)': -8,
    'Kamchatka (+ 09:00 from Moscow)': -9,
  };
  try {
    const DATE = moment(`${strDate} +0000`, 'DD-MM-YYYY hh:mm:ss Z');
    if (!DATE.isValid()) return '';

    return DATE.add(timezones[zone], 'hours').toJSON();
  } catch (error) {
    console.error(error);
    console.error("Can't create valid date for XML");
    return '';
  }
};
