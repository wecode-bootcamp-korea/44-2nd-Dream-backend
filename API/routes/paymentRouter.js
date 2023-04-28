const express = require('express');
const paymentController = require('../controllers/paymentController');
const checkLogInToken = require('../utils/auth');

const router = express.Router();

router.post('/buying', checkLogInToken, paymentController.createBuyPayment);
router.post('/Biding/buying', checkLogInToken, paymentController.buyBiding);
module.exports = {
  router,
};
