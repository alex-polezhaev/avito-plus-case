import axios from 'axios';
import createTinkoffToken from './createTinkoffToken.js';
import { topUpBalanceTransaction } from './transactions.js';

const paymentInit = async (roundAmount, userID) => {
  const TerminalKey = process.env.TINKOFF_TERM_KEY;
  const kopecksAmount = +roundAmount * 100;
  const Description = 'Balance top-up on the Avito Plus online service';

  const OrderId = await topUpBalanceTransaction(userID, roundAmount);
  const tokenBody = {
    TerminalKey,
    Amount: kopecksAmount,
    OrderId,
    Description,
  };
  const Token = createTinkoffToken(tokenBody);

  const { data } = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
    TerminalKey,
    Amount: kopecksAmount,
    OrderId,
    Description,
    Token,
  });
  return data.PaymentURL;
};

export default paymentInit;
