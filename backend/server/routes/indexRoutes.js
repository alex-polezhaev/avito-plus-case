import express from 'express';
import usersRoutes from './users.js'; // OK
import accountsRoutes from './accounts.js';
import specsRoutes from './specs.js';
import fieldsRoutes from './fields.js';
import servicesRoutes from './services.js';

const router = express.Router();

const routes = [
  usersRoutes,
  accountsRoutes,
  specsRoutes,
  fieldsRoutes,
  servicesRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
