import express from 'express';
import authRoutes from './auth.js';
import avitoRoutes from './avito.js';
import googleRoutes from './google.js';
import mongoRoutes from './mongo.js';
import tinkoffRoutes from './tinkoff.js';
import xmlRoutes from './xml.js';
import yandexRoutes from './yandex.js';

const router = express.Router();

const routes = [
  authRoutes,
  avitoRoutes,
  googleRoutes,
  mongoRoutes,
  tinkoffRoutes,
  xmlRoutes,
  yandexRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
