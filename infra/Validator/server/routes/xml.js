import express from 'express';
import {
  loadXMLController,
} from '../controllers/xmlController.js';

const router = express.Router();

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

/* ** XML ** */
// View the xml file by account id
router.get('/xml/:accID', loadXMLController);

export default router;
