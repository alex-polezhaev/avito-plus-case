import { api } from '../api/index.js';

// Total number of ads on the account
const getAdsAmount = (acc_id) => api('mongo').get('/specs')
  .then(({ data }) => {
    const specs = data;
    if (specs.length === 0) {
      console.log(`Dangerous logic error in specsDB - check account ${acc_id}`);
      return 'The account has no specifications';
    }
    let result = 0;

    specs.forEach((spec) => {
      const { total_ads } = spec.stat;
      result += total_ads;
    });

    return result;
  });

// Adds validation flags to the accounts array
export const addValidateMarks = async (accs) => {
  const markedAccs = accs.map(async (acc) => {
    // The date has not expired
    if (new Date(acc.expire_at) > new Date()) {
      acc.valid_by_date = true;
    } else acc.valid_by_date = false;

    // The Avito id is present
    if (acc?.avito?.id) {
      acc.valid_by_avito = true;
    } else acc.valid_by_avito = false;

    const adsAmount = await getAdsAmount(acc._id);
    const tariffLimit = await api('tinkoff').get(`/tariff/amount/${acc.month_price}`);

    // The ads limit is not exceeded
    if (adsAmount > tariffLimit) {
      acc.valid_by_limit = false;
    } else acc.valid_by_limit = true;

    return acc;
  });

  return Promise.all(markedAccs);
};
