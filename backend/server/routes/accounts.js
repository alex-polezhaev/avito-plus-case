import express from 'express';
import {
  updateAccByIdController,
  getAccsByUserIdController,
  getAccsAndSpecsByUserIdController,
  editAccountTitleController,
} from '../controllers/accountController.js';
import verifyToken from '../middleware/validateToken.js';
import { requireFields } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Note: accounts are not created directly here. A new account, its spreadsheet
// and its first specification are provisioned together by createNewTableController
// (POST /google/new_table) in the services controller.

router.patch('/accounts/:accID', verifyToken, asyncHandler(updateAccByIdController));
router.get('/accounts/byUser/:userID', verifyToken, asyncHandler(getAccsByUserIdController));
router.get('/accountsAndSpecs/byUser', verifyToken, asyncHandler(getAccsAndSpecsByUserIdController));
router.patch(
  '/edit_acc_title/:accID',
  verifyToken,
  requireFields(['newTitle']),
  asyncHandler(editAccountTitleController),
);

export default router;
