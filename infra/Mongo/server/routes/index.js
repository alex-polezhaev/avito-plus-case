import express from 'express';
import userRoutes from './user.js';
import accountRoutes from './account.js';
import specRoutes from './spec.js';
import fieldRoutes from './field.js';
import taskRoutes from './task.js';

const router = express.Router();

const routes = [userRoutes, accountRoutes, specRoutes, fieldRoutes, taskRoutes];

routes.forEach((route) => router.use(route));

export default router;
