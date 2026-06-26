import express from 'express';
import {
  loginUserController,
  registerUserController,
  forgotPasswordController,
  resetPasswordController,
  verifyUserController,
} from '../controllers/authController.js';

const router = express.Router();

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

router.post('/login', loginUserController);
router.post('/register', registerUserController);
router.all('/verify/:userID', verifyUserController);
router.post('/forgot', forgotPasswordController);
router.post('/reset', resetPasswordController);

export default router;
