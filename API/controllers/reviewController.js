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

module.exports = { createReview };
