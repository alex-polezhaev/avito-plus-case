import { DateTime } from 'luxon';

export const parseSheetDate = (strDate) => {
  if (!strDate || typeof strDate !== 'string') return undefined;

  try {
    const zone = 'Europe/Moscow';
    let date;

    date = DateTime.fromFormat(strDate, 'd.M.yyyy', { zone });
    if (date.isValid) return date;

    date = DateTime.fromFormat(strDate, 'd.M.yyyy h:m:s', { zone });
    if (date.isValid) return date;

    date = DateTime.fromFormat(strDate, 'd.M.yyyy h:m', { zone });
    if (date.isValid) return date;

    throw new Error(`Can't create valid date parseSheetDate - ${strDate}`);
  } catch (error) {
    console.error(error);
    console.error("Can't create valid date for parseSheetDate");
    return undefined;
  }
};
