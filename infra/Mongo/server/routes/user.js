import express from 'express';
import {
  getUserByIdController,
  updateUserByIdController,
  getUserByEmailController,
  createUserController,
  pushUserTransactionController,
  getUserByOrderIdController,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users/:userID', getUserByIdController);
router.patch('/users/:userID', updateUserByIdController);
router.get('/users/byEmail/:email', getUserByEmailController);
router.post('/users', createUserController);
router.post('/users/transactions/:userID', pushUserTransactionController);
router.get('/users/byTransaction/:orderID', getUserByOrderIdController);

export default router;
