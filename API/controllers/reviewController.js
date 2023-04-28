const reviewService = require('../services/reviewService');
const { catchAsync, BaseError } = require('../utils/error');

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const { content, title, productId } = req.body;

  const url = req.file.location;

  if (!productId) throw new BaseError('NOT_USERID_OR_PRODUCTID', 400);

  const review = await reviewService.createReview(
    userId,
    productId,
    content,
    title,
    url
  );

  return res.status(201).json({ message: 'CREATE_REVIEW' });
});

const getReviewByProductId = catchAsync(async (req, res) => {
  const { productId } = req.query;
  const getReview = await reviewService.getReviewByProductId(productId);
  return res.status(200).json(getReview);
});

const deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;

  if (!reviewId) throw new BaseError(400, 'KEY_ERROR');

  await reviewService.deleteReview(reviewId);
  res.status(200).json({ message: 'SUCCESS_DELETE' });
});

module.exports = {
  createReview ,
  getReviewByProductId,
  deleteReview,
};
