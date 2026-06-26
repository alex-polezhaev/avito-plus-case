import express from 'express';
import {
  setAvitoSettingsController,
} from '../controllers/avitoController.js';
import verifyToken from '../middleware/validateToken.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

// Set the XML link in Avito and store the profile in the database
router.put('/avito/connect/:accID', verifyToken, setAvitoSettingsController);

export default router;
