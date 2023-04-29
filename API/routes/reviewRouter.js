const express = require('express');

const reviewController = require('../controllers/reviewController');
const checkLogInToken = require('../utils/auth');
const { upload } = require('../utils/s3');
const router = express.Router();

router.post(
  '',
  checkLogInToken,
  upload.single('reviewImg'),
  reviewController.createReview
);

module.exports = { router };
