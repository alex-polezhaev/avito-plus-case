import express from 'express';
import folderRoutes from './folder.js';
import imageRoutes from './image.js';
import tokenRoutes from './token.js';

const router = express.Router();

const routes = [folderRoutes, imageRoutes, tokenRoutes];

routes.forEach((route) => router.use(route));

export default router;
