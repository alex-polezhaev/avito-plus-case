import express from 'express';
import { rateLimit } from 'express-rate-limit';
import {
  getYandexToken,
  imageBufferController,
} from '../controllers/yandexController.js';

const router = express.Router();

// Create the limiter
const imageLimiter = rateLimit({
  windowMs: 1000, // Window: 10 sec
  max: 20, // Limit: 10 requests per minute
  message: 'Too many requests, please try again later.', // Message shown when the limit is exceeded
});

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

/* ** YANDEX ** */
// Store the Yandex token after OAuth login (redirect)
router.get('/yandex/token', getYandexToken);
// Middleware for viewing Yandex direct links
router.get('/img/:letter/:imageKey', imageBufferController);

export default router;
