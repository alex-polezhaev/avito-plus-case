import express from 'express';
import {
  getUserByIdController,
  updateUserFirstnameByIdController,
  loginUserController,
  registerUserController,
  forgotPasswordController,
  resetPasswordController,
  verifyUserController,
} from '../controllers/userController.js';
import verifyToken from '../middleware/validateToken.js';
import { requireFields, requireEmail } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

router.get('/users', verifyToken, asyncHandler(getUserByIdController));
router.patch(
  '/users',
  verifyToken,
  requireFields(['firstname']),
  asyncHandler(updateUserFirstnameByIdController),
);

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

router.post(
  '/login',
  requireEmail(),
  requireFields(['password']),
  asyncHandler(loginUserController),
);
router.post(
  '/register',
  requireEmail(),
  requireFields(['firstname', 'password']),
  asyncHandler(registerUserController),
);
router.all('/verify/:userID', asyncHandler(verifyUserController));
router.post('/forgot', requireEmail(), asyncHandler(forgotPasswordController));
router.post(
  '/reset',
  requireFields(['userID', 'password', 'confirmPassword', 'token']),
  asyncHandler(resetPasswordController),
);

export default router;
