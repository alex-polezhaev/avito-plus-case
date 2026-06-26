import express from 'express';
import {
  createSpecController,
  getSpecByIdController,
  getSpecByAccIdController,
  updateSpecByIdController,
  delSpecByIdController,
  getAllSpecsController,
  updateSpecBySheetAndAccIdController,
  getSpecByUserIdAndSpecId,
} from '../controllers/specController.js';

const router = express.Router();

router.post('/specs', createSpecController);
router.get('/specs/:specID', getSpecByIdController);
router.get('/specs/byAcc/:accID', getSpecByAccIdController);
router.patch('/specs/:specID', updateSpecByIdController);
router.delete('/specs/:specID', delSpecByIdController);
router.get('/specs', getAllSpecsController);
router.get('/spec/:userID/:specID', getSpecByUserIdAndSpecId);
/**
 * Query
 */
router.patch('/update_spec_by_sheet_and_acc_id', updateSpecBySheetAndAccIdController);

export default router;
