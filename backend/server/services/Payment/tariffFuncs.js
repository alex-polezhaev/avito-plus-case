import { getLogger } from '../../config/logger.js';

const logger = getLogger();

export const getTariffAdsAmount = (price) => {
  const tariff = {
    1490: 1000,
    2900: 5000,
    3900: 10000,
    5900: 50000,
  };
  if (!tariff[price]) {
    logger.warn(`Attempt to read an unknown tariff ${price} - needs attention!`);
  }
  return tariff[price];
};
