import express from 'express';
import tinkoffRoutes from './routes.js';

const router = express.Router();

const routes = [
  tinkoffRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
