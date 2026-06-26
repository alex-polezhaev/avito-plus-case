import express from 'express';
import {
  getFieldsController,
  getPossibleFieldsController,
} from '../controllers/fieldController.js';
import verifyToken from '../middleware/validateToken.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/fields', verifyToken, asyncHandler(getFieldsController));
router.get('/fieldsPossible/:accID', verifyToken, asyncHandler(getPossibleFieldsController));

export default router;
