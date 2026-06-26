import express from 'express';
import { getYandexToken } from '../controllers/tokenController.js';

const router = express.Router();

router.get('/yandex/token', getYandexToken);

export default router;
