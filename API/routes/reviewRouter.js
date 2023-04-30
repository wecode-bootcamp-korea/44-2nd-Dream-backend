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
router.get('', reviewController.getReviewByProductId);
router.delete('/:reviewId', checkLogInToken, reviewController.deleteReview);

router.patch(
  '',
  checkLogInToken,
  upload.single('reviewImg'),
  reviewController.updateReview
);

module.exports = {
  router,
};
