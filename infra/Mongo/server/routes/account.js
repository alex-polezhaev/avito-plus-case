import express from 'express';
import {
  getAllAccsController,
  getAccByIdController,
  updateAccByIdController,
  getAccsByUserIdController,
  createAccController,
  findAccsToRenewController,
  getAccountByUserIdAndAccId,
} from '../controllers/accountController.js';

const router = express.Router();

router.get('/accounts', getAllAccsController);
router.get('/accounts/:accID', getAccByIdController);
router.patch('/accounts/:accID', updateAccByIdController);
router.get('/accounts/byUser/:userID', getAccsByUserIdController);
router.post('/accounts', createAccController);
router.get('/accounts_ready_to_renew', findAccsToRenewController);
router.get('/account/:userID/:accID', getAccountByUserIdAndAccId);

export default router;
