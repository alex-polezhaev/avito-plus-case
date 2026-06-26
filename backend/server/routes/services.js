import express from 'express';
import {
  loadXMLController,
  getYandexToken,
  createNewTableController,
  autoRenewSubController,
  setAvitoSettingsController,
  addSheetController,
  delSheetController,
  paymentInitController,
  catchPaymentController,
  imageBufferController,
  simpleChangeTariffController,
  simpleRenewTariffController,
  updateTableDataInStorageController,
  startAvitoReportAndStatController,
  startOneMinuteScriptsController,
} from '../controllers/servicesController.js';
import verifyToken from '../middleware/validateToken.js';
import requireCronSecret from '../middleware/requireCronSecret.js';
import { requireFields } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

/* ** AVITO ** */
// Set the XML feed URL in Avito and persist the profile to the database
router.put('/avito/connect/:accID', verifyToken, asyncHandler(setAvitoSettingsController));

/* ** GOOGLE ** */
// Create a spreadsheet for a single specification
router.post(
  '/google/new_table',
  verifyToken,
  requireFields(['title', 'category']),
  asyncHandler(createNewTableController),
);

// Add a sheet to an existing spreadsheet
router.post('/google/add_sheet', verifyToken, asyncHandler(addSheetController));

// Delete a sheet together with its values sheet
router.post('/google/del_sheet/:specID', verifyToken, asyncHandler(delSheetController));

/* ** TINKOFF ** */
// Initialize a payment
router.post(
  '/payment/init',
  verifyToken,
  requireFields(['amount', 'userID']),
  asyncHandler(paymentInitController),
);

/* ** TARIFF ** */
// Change the tariff
router.patch(
  '/tariff/simple_change',
  verifyToken,
  requireFields(['accID', 'newMonthPrice']),
  asyncHandler(simpleChangeTariffController),
);
// Manually renew the tariff
router.patch(
  '/tariff/simple_renew',
  verifyToken,
  requireFields(['accID']),
  asyncHandler(simpleRenewTariffController),
);

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

/* ** YANDEX ** */
// Store the Yandex token after the OAuth login redirect
router.get('/yandex/token', asyncHandler(getYandexToken));
// Proxy for viewing Yandex direct image links
router.get('/img/:letter/:imageKey', asyncHandler(imageBufferController));

/* ** XML ** */
// View the XML feed by account id
router.get('/xml/:accID', asyncHandler(loadXMLController));

/* ** TINKOFF ** */
// Receive payment data after the redirect from the checkout page
router.get('/payment/catch', asyncHandler(catchPaymentController));

/** =================== */
/** CRON ROUTES */
/** ================= */
// Triggered by an external scheduler; protected by the shared CRON_SECRET.

// CRON: load table data into the local Google/tablesData storage for XML access
router.get(
  '/cron/update_all_acc_values',
  requireCronSecret,
  asyncHandler(updateTableDataInStorageController),
);
// CRON: start loading Avito statistics in queue order
router.get(
  '/cron/start_load_avito_stat',
  requireCronSecret,
  asyncHandler(startAvitoReportAndStatController),
);
// CRON: start the one-minute scripts
router.get(
  '/cron/start_one_minute_scripts',
  requireCronSecret,
  asyncHandler(startOneMinuteScriptsController),
);
// CRON: start automatic subscription renewal for accounts
router.get(
  '/cron/auto_renew_subscribtion',
  requireCronSecret,
  asyncHandler(autoRenewSubController),
);

export default router;
