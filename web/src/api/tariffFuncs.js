export const getTariffTitleByPrice = (price) => {
  const tariff = {
    1490: 'Up to 1000 listings (1490 rub/mo)',
    2900: 'Up to 5000 listings (2900 rub/mo)',
    3900: 'Up to 10000 listings (3900 rub/mo)',
    5900: 'Unlimited (5900 rub/mo)',
  };
  return tariff[price];
};

export const getShortTariffTitleByPrice = (price) => {
  const tariff = {
    1490: 'Up to 1000 listings',
    2900: 'Up to 5000 listings',
    3900: 'Up to 10000 listings',
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

// Calculates the surcharge for the new tariff, taking into account the remainder of the old one
export const getMoneyDiffBetweenTarif = (currentPrice, newPrice, expire_at) => {
  const dateDiff = (new Date(expire_at) - new Date()) / (60 * 60 * 24 * 1000);
  const moneyDiff = -Math.round((currentPrice / 30) * dateDiff - newPrice);
  if (dateDiff > 0 && moneyDiff > 0) {
    return moneyDiff;
  }
  if (dateDiff < 0 && moneyDiff > 0) {
    return newPrice;
  }
  return 0;
};
