import express from 'express';
import {
  editFolderTitleController,
  createFolderController,
} from '../controllers/folderController.js';

const router = express.Router();

router.patch('/folder', editFolderTitleController);
router.post('/folder/:accID', createFolderController);

export default router;
