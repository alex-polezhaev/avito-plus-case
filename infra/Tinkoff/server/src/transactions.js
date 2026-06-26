import { nanoid } from 'nanoid';
import { newTransactionByUserId } from './helpers/mongoFuncs.js';

export const topUpBalanceTransaction = async (userID, payAmount) => {
  const order_id = nanoid(12);
  newTransactionByUserId(userID, {
    order_id,
    title: 'Balance top-up',
    transaction: `+ ${payAmount}`,
    date: new Date(),
    success: false,
    message: null,
  });
  return order_id;
};

export const writeOffBalanceTransaction = async (userID, accTitle, spendAmount) => {
  await newTransactionByUserId(userID, {
    title: `Plan renewal "${accTitle}"`,
    transaction: `- ${spendAmount}`,
    date: new Date(),
    success: true,
  });
  return null;
};

// Calculates the surcharge for the new plan, accounting for the remainder of the old one
export const getMoneyDiffBetweenTariff = (currentPrice, newPrice, expire_at) => {
  const dateDiff = (new Date(expire_at) - new Date()) / (60 * 60 * 24 * 1000);
  const moneyDiff = -Math.round((currentPrice / 30) * dateDiff - newPrice);
  if (dateDiff > 0 && moneyDiff > 0) {
    return moneyDiff;
  } if (dateDiff < 0 && moneyDiff > 0) {
    return newPrice;
  } return 0;
};
