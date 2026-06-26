export const formatDateDMY = (nonFormatDate) =>
  new Date(nonFormatDate).toLocaleString('RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const formatDateDMYNum = (nonFormatDate) =>
  new Date(nonFormatDate).toLocaleString('RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

export const formatDateDMYHM = (nonFormatDate) =>
  new Date(nonFormatDate).toLocaleString('RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const plusDaysToExpireAt = (expire_at, days = 7) =>
  new Date(new Date(expire_at).setDate(new Date().getDate() + days));
