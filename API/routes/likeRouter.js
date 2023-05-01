const express = require('express');
const likeController = require('../controllers/likeController');
const checkLogInToken = require('../utils/auth');

const router = express.Router();

router.get('/:proudctId', checkLogInToken, likeController.isLike);
router.delete('/:productId', checkLogInToken, likeController.deleteLike);

module.exports = {
  router,
};
