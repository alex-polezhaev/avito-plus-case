import express from 'express';
import {
  paymentInitController,
  changeTariffController,
  renewTariffController,
  getTariffTitleByPriceController,
  getShortTariffTitleByPriceController,
  getTariffAdsAmountController,
  getMoneyDiffController,
  paymentStatusController,
} from '../controllers/controllers.js';

const router = express.Router();

router.post('/payment/init', paymentInitController);
router.post('/payment/status', paymentStatusController);
router.patch('/tariff/change', changeTariffController);
router.patch('/tariff/renew', renewTariffController);
router.get('/tariff/title_by_price', getTariffTitleByPriceController);
router.get('/tariff/short_title_by_price', getShortTariffTitleByPriceController);
router.get('/tariff/amount/:price', getTariffAdsAmountController);
router.get('/tariff/money_diff', getMoneyDiffController);

export default router;
