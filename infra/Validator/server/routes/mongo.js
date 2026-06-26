import express from 'express';
import {
  getUserByIdController,
  updateUserFirstnameByIdController,
  updateAccByIdController,
  getAccsByUserIdController,
  getAccsAndSpecsByUserIdController,
  editAccountTitleController,
  getSpecsByAccIdController,
  getFieldsController,
  getPossibleFieldsController,
  createTaskController,
} from '../controllers/mongoController.js';
import verifyToken from '../middleware/validateToken.js';

const router = express.Router();

/** =================== */
/** PROTECTED ROUTES */
/** ================= */

/* ** User ** */
router.get('/users', verifyToken, getUserByIdController);
router.patch('/users', verifyToken, updateUserFirstnameByIdController);

/* ** Account ** */
router.patch('/accounts/:accID', verifyToken, updateAccByIdController);
router.get('/accounts/byUser/:userID', verifyToken, getAccsByUserIdController);
router.get('/accountsAndSpecs/byUser', verifyToken, getAccsAndSpecsByUserIdController);
router.patch('/edit_acc_title/:accID', verifyToken, editAccountTitleController);

/* ** Spec ** */
router.get('/specs/byAcc/:accID', verifyToken, getSpecsByAccIdController);

/* ** Field ** */
router.get('/fields', verifyToken, getFieldsController);
router.get('/fieldsPossible/:accID', verifyToken, getPossibleFieldsController);

/* ** Task ** */
router.post('/tasks', verifyToken, createTaskController);

export default router;
