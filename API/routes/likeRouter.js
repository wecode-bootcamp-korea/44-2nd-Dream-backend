const express = require('express');
const checkLogInToken = require('../utils/auth');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.get('/:proudctId', checkLogInToken, likeController.isLike);

module.exports = {
  router,
};
