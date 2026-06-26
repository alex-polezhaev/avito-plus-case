import express from 'express';
import {
  getImageLinksController,
} from '../controllers/imageController.js';

const router = express.Router();

router.put('/folder/images', getImageLinksController);

export default router;
