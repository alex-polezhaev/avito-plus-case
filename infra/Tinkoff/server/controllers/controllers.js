import { api } from '../api/index.js';

import paymentInit from '../src/paymentInit.js';
import {
  updateUserById,
  getUserByOrderId,
  getAccById,
  getUserById,
  updateAccById,
} from '../src/helpers/mongoFuncs.js';
import {
  getMoneyDiffBetweenTariff,
  writeOffBalanceTransaction,
} from '../src/transactions.js';
import {
  getMoneyDiffBetweenTarif,
  getShortTariffTitleByPrice,
  getTariffAdsAmount,
  getTariffTitleByPrice,
} from '../addons/index.js';
import { getPaymentStatus } from '../src/getPaymentStatus.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

const setDate = (days = 7) => new Date(new Date().setDate(new Date().getDate() + days));

/**
 * TINKOFF PAYMENT INIT
 * --------------------
 * Using to get tinkoff payment link
 * Add pending transactions by userID
 * @params amount - round payment in rub
 * @params userID - payment initiator
 * @return tinkoff payment link
 */
export const paymentInitController = (req, res) => {
  const { amount, userID } = req.body;
  paymentInit(amount, userID)
    .then((PaymentURL) => {
      res.status(200).json({ PaymentURL });
    }).catch(handleAsyncServerError(res));
};

export const changeTariffController = async (req, res) => {
  try {
    const { accID, newMonthPrice } = req.body;
    const acc = await getAccById(accID);

    if (![1490, 2900, 3900, 5900]
      .includes(Number(newMonthPrice))) {
      return res.status(400).json({ message: 'Invalid tariff price' });
    }
    if (acc.month_price === Number(newMonthPrice)) {
      return res.status(200).json({ message: 'Tariff is the same as you have now' });
    }
    if (!acc) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (!accID || !newMonthPrice) {
      return res.status(400).json({ message: 'accID | newMonthPrice not found in request' });
    }

    const { month_price, expire_at } = acc;
    const writeOffMoney = getMoneyDiffBetweenTariff(month_price, newMonthPrice, expire_at);

    const userBalance = await getUserById(acc.user_id)
      .then(({ balance }) => balance);

    if (userBalance < writeOffMoney) {
      return res.status(400).json({ message: 'Insufficient funds for the charge' });
    }

    await updateUserById(
      acc.user_id,
      { balance: userBalance - writeOffMoney },
    );

    await updateAccById(accID, {
      month_price: newMonthPrice,
      expire_at: setDate(30),
    });

    return res.status(200).json({ message: 'Simple tariff changed successfully' });
  } catch (err) { handleServerError(err); }

  return null;
};

export const renewTariffController = async (req, res) => {
  try {
    const { accID } = req.body;

    if (!accID) {
      return res.status(400).json({ message: 'accID not found in request' });
    }

    const acc = await getAccById(accID);
    const user = await getUserById(acc.user_id);

    if (user.balance < acc.month_price) {
      return res.status(400).json({ message: 'Sorry, you dont have enought money mister Zuckerberg' });
    }
    if (!acc || !user) {
      return res.status(400).json({ message: 'Can not find user or account in database' });
    }

    const plusDaysToExpireAt = (expire_at, days = 7) => {
      const today = new Date();
      const expireAt = new Date(expire_at);

      if (expireAt < today) {
        return new Date(today.setDate(new Date().getDate() + days));
      }
      return new Date(expireAt.setDate(new Date().getDate() + days));
    };

    await updateUserById(user._id, { balance: user.balance - acc.month_price });
    await updateAccById(
      acc._id,
      { expire_at: plusDaysToExpireAt(acc.expire_at, 30) },
    );
    await writeOffBalanceTransaction(user._id, acc.title, acc.month_price);

    return res.status(200).json({ message: 'Simple tariff renewed successfully' });
  } catch (err) { handleServerError(err); }
};

export const getTariffTitleByPriceController = (req, res) => {
  const { price } = req.body;
  res.status(200).end(getTariffTitleByPrice(price));
};

export const getShortTariffTitleByPriceController = (req, res) => {
  const { price } = req.body;
  res.status(200).end(getShortTariffTitleByPrice(price));
};

export const getTariffAdsAmountController = (req, res) => {
  const { price } = req.params;
  const result = getTariffAdsAmount(price);
  res.status(200).json(result);
};

export const getMoneyDiffController = (req, res) => {
  const { currentPrice, newPrice, expire_at } = req.body;
  res.status(200).end(getMoneyDiffBetweenTarif(currentPrice, newPrice, expire_at));
};

export const autoRenewSubController = (req, res) => {
  const { accounts } = req.body;

  if (accounts === 0 || !accounts) {
    res.status(200).end('zero accounts to renew sub');
  }

  try {
    accounts.forEach(async (acc) => {
      try {
        const user = await api('mongo').get(`/users/${acc.user_id}`);

        if (user.balance >= acc.month_price) {
          const newBalance = user.balance - acc.month_price;
          api('mongo').patch(`/users/${user._id}`, { balance: newBalance });
          api('mongo').patch(`/accounts/${acc._id}`, { expire_at: setDate(30) });
          console.log(`Plan automatically renewed for account ${acc.title}`);
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) { handleServerError(err); }
};

export const paymentStatusController = async (req, res) => {
  try {
    const { PaymentId } = req.body;
    if (!PaymentId) {
      return res
        .status(400)
        .json({ message: 'PaymentId required ' });
    }

    const {
      OrderId,
      Success,
      Message,
      Amount,
    } = await getPaymentStatus(PaymentId);
    const success = Success;

    const [user] = await getUserByOrderId(OrderId);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found!' });
    }

    let error;

    // Update the transactions array
    const newTransactions = user.transactions.map((transaction) => {
      const { order_id: currOrderID } = transaction;
      if (currOrderID === OrderId && transaction.success) {
        error = true;
      }
      if (currOrderID === OrderId) {
        return {
          ...transaction,
          success,
          message: Message,
        };
      }
      return transaction;
    });

    if (error) {
      console.log(`Attempt to confirm a transaction again ${user.firstname}`);
      res.status(500).send('Transaction already updated');
      return null;
    }

    // New balance based on success
    const newBalance = success ? user.balance + (+Amount / 100) : user.balance;

    // Send the new data to the database
    await updateUserById(user._id, {
      balance: newBalance,
      transactions: newTransactions,
    });

    res.status(201).send('Transaction updated');
  } catch (error) {
    handleServerError(res, error);
  }
};
