import express from 'express';
import {
  loginUserController,
  registerUserController,
  forgotPasswordController,
  resetPasswordController,
  verifyUserController,
} from '../controllers/controllers.js';

const router = express.Router();

router.post('/login', loginUserController);
router.post('/register', registerUserController);
router.all('/verify/:userID', verifyUserController);
router.post('/forgot', forgotPasswordController);
router.post('/reset', resetPasswordController);

export default router;
