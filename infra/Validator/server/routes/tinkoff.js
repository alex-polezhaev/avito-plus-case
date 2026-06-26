import express from 'express';
import {
  paymentInitController,
  changeTariffController,
  renewTariffController,
  catchPaymentController,
  statusPaymentController,
} from '../controllers/tinkoffController.js';
import verifyToken from '../middleware/validateToken.js';

const router = express.Router();

/** ================= */
/** PROTECTED ROUTES */
/** =============== */

// Payment initialization
router.post('/payment/init', verifyToken, paymentInitController);

/* ** TARIFF ** */
// Change the plan
router.patch('/tariff/simple_change', verifyToken, changeTariffController);
// Manual plan renewal
router.patch('/tariff/simple_renew', verifyToken, renewTariffController);
// Webhook for receiving the payment status
router.post('/payment/status', statusPaymentController);

/** =================== */
/** UNPROTECTED ROUTES */
/** ================= */

// Get the payment data after redirect from the payment page
router.get('/payment/catch', catchPaymentController);

export default router;
