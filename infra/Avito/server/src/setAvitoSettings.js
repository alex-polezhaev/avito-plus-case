import axios from 'axios';
import authAvito from './authAvito.js';

export const setAvitoSettings = async (clientId, clientSecret, xmlLink) => {
  const token = await authAvito(clientId, clientSecret);
  axios
    .post(
      'https://api.avito.ru/autoload/v1/profile',
      {
        upload_url: xmlLink,
        autoload_enabled: true,
        report_email: process.env.MANAGER_TABLE_EMAIL,
        schedule: [
          {
            rate: 50000,
            weekdays: [0, 1, 4, 3, 2, 5, 6],
            time_slots: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23,
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      },
    )
    .catch((err) => console.log(err.response.data));
};

export const getProfile = async (clientId, clientSecret) => {
  const token = await authAvito(clientId, clientSecret);
  return axios
    .get('https://api.avito.ru/core/v1/accounts/self', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch((err) => console.log(err.response.data));
};
