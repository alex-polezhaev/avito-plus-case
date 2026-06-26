import express from 'express';
import { getSpecsByAccIdController } from '../controllers/specController.js';
import verifyToken from '../middleware/validateToken.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Note: specifications are created internally by the services controller
// (createNewTableController / addSheetController), not via a public route.
router.get('/specs/byAcc/:accID', verifyToken, asyncHandler(getSpecsByAccIdController));

export default router;
