export const formatDateDMYHM = (nonFormatDate) => new Date(nonFormatDate).toLocaleString('RU', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const setDate = (days = 7) => new Date(new Date().setDate(new Date().getDate() + days));
