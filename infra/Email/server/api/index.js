import axios from 'axios';

const localhost = 'http://127.0.0.1';

export const api = (service) => {
  const ports = {
    mongo: process.env.MONGO_PORT,
    google: process.env.GOOGLE_PORT,
    yandex: process.env.YANDEX_PORT,
    avito: process.env.AVITO_PORT,
    auth: process.env.AUTH_PORT,
    xml: process.env.XML_PORT,
    email: process.env.EMAIL_PORT,
    tinkoff: process.env.TINKOFF_PORT,
    telegram: process.env.TELEGRAM_PORT,
  };

  return axios.create({
    baseURL: `${localhost}:${ports[service]}`,
  });
};
