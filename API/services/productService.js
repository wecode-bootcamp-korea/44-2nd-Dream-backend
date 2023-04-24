const productDao = require('../models/productDao');
const { BaseError } = require('../utils/error');

const getProductDetail = async (productId) => {
  const checkProductId = await productDao.isExistingProduct(productId);

  if (!checkProductId) {
    throw new BaseError('PRODUCT_DOES_NOT_EXIST', 404);
  }

  const productDetail = await productDao.productDetail(productId);
  productDetail.premiumPercent = (
    ((productDetail.recentDealPrice - productDetail.originalPrice) /
      productDetail.originalPrice) *
    100
  ).toFixed(1);
  return productDetail;
};

module.exports = {
  getProductDetail,
};
