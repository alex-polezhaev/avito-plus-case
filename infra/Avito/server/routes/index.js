import express from 'express';
import avitoRoutes from './routes.js';

const router = express.Router();

const routes = [
  avitoRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
