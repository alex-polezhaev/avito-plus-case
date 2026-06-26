import express from 'express';
import {
  setAvitoSettingsController,
  saveReportAndStatToMongoController,
  getActualReportController,
  getActualStatController,
} from '../controllers/controllers.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

// Set the XML link in Avito and store the profile in the database
router.put('/connect/:accID', setAvitoSettingsController);
router.get('/report/:accID', getActualReportController);
router.get('/stat/:accID', getActualStatController);

/** =================== */
/** CRON ROUTES */
/** ================= */

// CRON: start uploading the report to mongo
router.put(
  '/cron/save_report_and_stat_to_mongo',
  saveReportAndStatToMongoController,
);

export default router;
