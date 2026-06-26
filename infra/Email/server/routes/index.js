import express from 'express';
import emailRoutes from './routes.js';

const router = express.Router();

const routes = [
  emailRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
