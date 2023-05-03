const express = require('express');
const checkLogInToken = require('../utils/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/bidding/buying', checkLogInToken, paymentController.buyBidding);
router.post(
  '/bidding/selling',
  checkLogInToken,
  paymentController.createSellBidding
);
router.post('/buying', checkLogInToken, paymentController.createBuyPayment);
router.post('/selling', checkLogInToken, paymentController.createSellPayment);

module.exports = {
  router,
};
