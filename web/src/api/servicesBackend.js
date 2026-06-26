import axios from 'axios';
import { backend } from './index.js';

const apiHostname = import.meta.env.VITE_API_URL;

export const paymentInit = (body, token) =>
  axios
    .post(`${apiHostname}/payment/init`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      const { PaymentURL } = data;
      window.location.href = PaymentURL;
    });

export const subscriptionRenewal = (accID, token) =>
  axios.patch(
    `${apiHostname}/subscription/renewal`,
    { accID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const changeTariff = (body, token) =>
  axios.patch(`${apiHostname}/tariff/change`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const setAvitoSettings = (token, accID, body) =>
  backend(token).put(`avito/connect/${accID}`, body);

export const tariffChange = (body, token) =>
  axios
    .patch(`${apiHostname}/tariff/simple_change`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);

export const tariffRenew = (body, token) =>
  axios
    .patch(`${apiHostname}/tariff/simple_renew`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);

export const getAllTableValues = (token, spreadsheetId) =>
  backend(token)
    .get(`/table/values/${spreadsheetId}`)
    .then(({ data }) => data);
