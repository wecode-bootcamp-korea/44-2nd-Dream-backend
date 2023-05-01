const likeDao = require('../models/likeDao');
const productDao = require('../models/productDao');
const { BaseError } = require('../utils/error');

const isLike = async (productId, userId) => {
  let likeId = await likeDao.isLike(productId, userId);

  if (!likeId) {
    await likeDao.createLike(proudctId, userId);
    return await likeDao.isLike(proudctId, userId);
  }
  await likeDao.deleteLike(proudctId, userId);
};

const deleteLike = async (productId, userId) => {
  const likeId = await likeDao.isLike(productId, userId);

  if (!likeId) {
    const error = new Error('NOT_LIKED_PRODUCT');
    error.statusCode = 400;
    throw error;
  }

  await likeDao.deleteLike(productId, userId);
  return productDao.productByLike(userId);
};

module.exports = { isLike, deleteLike };
