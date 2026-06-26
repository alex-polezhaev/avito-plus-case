import express from 'express';
import tableRoutes from './table.js';
import cronRoutes from './cron.js';

const router = express.Router();

const routes = [
  tableRoutes, cronRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
