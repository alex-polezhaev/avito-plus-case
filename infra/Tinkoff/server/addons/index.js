export const getTariffTitleByPrice = (price) => {
  const tariff = {
    1490: 'Up to 1000 ads (1490 RUB/month)',
    2900: 'Up to 5000 ads (2900 RUB/month)',
    3900: 'Up to 10000 ads (3900 RUB/month)',
    5900: 'Unlimited (5900 RUB/month)',
  };
  return tariff[price];
};

export const getShortTariffTitleByPrice = (price) => {
  const tariff = {
    1490: 'Up to 1000 ads',
    2900: 'Up to 5000 ads',
    3900: 'Up to 10000 ads',
    5900: 'Unlimited',
  };
  return tariff[price];
};

export const getTariffAdsAmount = (price) => {
  const tariff = {
    1490: 1000,
    2900: 5000,
    3900: 10000,
    5900: 50000,
  };
  return tariff[price];
};

// Calculates the surcharge for the new plan, accounting for the remainder of the old one
export const getMoneyDiffBetweenTarif = (currentPrice, newPrice, expire_at) => {
  const dateDiff = (new Date(expire_at) - new Date()) / (60 * 60 * 24 * 1000);
  const moneyDiff = -Math.round((currentPrice / 30) * dateDiff - newPrice);
  if (dateDiff > 0 && moneyDiff > 0) {
    return moneyDiff;
  } if (dateDiff < 0 && moneyDiff > 0) {
    return newPrice;
  } return 0;
};
