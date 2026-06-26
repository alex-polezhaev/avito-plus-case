import axios from 'axios';
import createTinkoffToken from './createTinkoffToken.js';

export const getPaymentStatus = async (PaymentId) => {
  const url = 'https://securepay.tinkoff.ru/v2/GetState';
  const TerminalKey = process.env.TINKOFF_TERM_KEY;
  const tokenBody = {
    TerminalKey,
    PaymentId,
  };
  const Token = createTinkoffToken(tokenBody);
  const body = {
    TerminalKey,
    PaymentId,
    Token,
  };
  return axios.post(url, body)
    .then((response) => response.data);
};
