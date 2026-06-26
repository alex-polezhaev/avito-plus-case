import express from 'express';
import {
  createNewTableController,
  addSheetController,
  delSheetController,
  getAllTableValuesController,
} from '../controllers/googleController.js';
import verifyToken from '../middleware/validateToken.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

/* ** GOOGLE ** */
// Create a spreadsheet for one specification
router.post('/google/new_table', verifyToken, createNewTableController);

// Add a sheet to the spreadsheet
router.post('/google/add_sheet', verifyToken, addSheetController);

// Delete a sheet and its values sheet
router.delete('/google/table/sheet/:specID', verifyToken, delSheetController);

// Get all data from the spreadsheet
router.get('/table/values/:spreadsheetId', verifyToken, getAllTableValuesController);

export default router;
