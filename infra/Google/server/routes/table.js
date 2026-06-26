import express from 'express';
import {
  editTableTitleController,
  createNewTableController,
  addSheetController,
  getAllTableValuesController,
  delSheetController,
} from '../controllers/tableController.js';

const router = express.Router();

router.patch('/table/title', editTableTitleController);
router.post('/table', createNewTableController);
router.post('/table/sheet', addSheetController);
router.get('/table/values/:spreadsheetId', getAllTableValuesController);
router.delete('/table/sheet/:specID', delSheetController);

export default router;
