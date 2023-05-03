const express = require('express');
const checkLogInToken = require('../utils/auth');
const reviewController = require('../controllers/reviewController');
const { upload } = require('../utils/s3');

const router = express.Router();

router.get('', reviewController.getReviewByProductId);
router.post(
  '',
  checkLogInToken,
  upload.single('reviewImg'),
  reviewController.createReview
);
router.patch(
  '',
  checkLogInToken,
  upload.single('reviewImg'),
  reviewController.updateReview
);
router.delete('/:reviewId', checkLogInToken, reviewController.deleteReview);

module.exports = {
  router,
};
