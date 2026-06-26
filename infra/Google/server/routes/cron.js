import express from 'express';
import { startOneMinuteScriptsController } from '../controllers/cronController.js';

const router = express.Router();

router.put('/scripts/cron', startOneMinuteScriptsController);

export default router;
