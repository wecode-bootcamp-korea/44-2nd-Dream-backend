const likeService = require('../services/likeService');
const { catchAsync, BaseError } = require('../utils/error');

const isLike = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const { proudctId } = req.params;

  if (!proudctId) throw new BaseError('KEY_ERROR', 400);

  const like = await likeService.isLike(proudctId, userId);

  if (like) return res.status(201).json({ message: 'CREATE_LIKE' });

  return res.status(204).json({ message: 'DELETE_LIKE' });
});

const deleteLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  if (!productId) {
    const error = new Error('KEY ERROR');
    error.statusCode = 400;
    throw error;
  }
  const likeList = await likeService.deleteLike(productId, userId);

  return res.status(200).json(likeList);
});

module.exports = {
  isLike,
  deleteLike,
};
