const express = require('express');
const bidController = require('../controllers/bidController');

const router = express.Router();

router.get('/graph/:productId', bidController.graphByTerm);
router.get('/info/:productId', bidController.infoByproductId);
module.exports = {
  router,
};
