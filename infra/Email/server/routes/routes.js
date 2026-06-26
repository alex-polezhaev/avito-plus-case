import express from 'express';
import {
  sendEmailController,
} from '../controllers/controllers.js';

const router = express.Router();

router.post('/email/send', sendEmailController);

export default router;
