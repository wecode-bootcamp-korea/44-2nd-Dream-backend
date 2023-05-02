const express = require('express');
const checkLogInToken = require('../utils/auth');
const bidController = require('../controllers/bidController');

const router = express.Router();

router.get('/graph/:productId', bidController.graphByTerm);
router.get('/info/:productId', bidController.infoByproductId);
router.get(
  '/biddingin/:productId',
  checkLogInToken,
  bidController.getBiddingInfo
);
router.post('/input', checkLogInToken, bidController.inputBidPrice);

module.exports = {
  router,
};
