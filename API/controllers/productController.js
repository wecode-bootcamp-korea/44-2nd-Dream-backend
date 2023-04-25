const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await productService.getProductDetail(productId);
  return res.status(200).json(productDetail);
});

const getProductList = catchAsync(async (req, res) => {
  const {
    categoryId,
    ageId,
    levelId,
    sort,
    sortorder,
    limit = 10,
    offset = 0,
  } = req.query;

  const products = await productService.getProductList(
    categoryId,
    ageId,
    levelId,
    sort,
    sortorder,
    parseInt(limit),
    parseInt(offset)
  );

  return res.status(200).json(products);
});
const productByLike = catchAsync(async (req, res) => {
  const userId = req.user.id;

  if (!userId) return new BaseError('YOU_NOT_INVALID', 401);

  const data = await productService.productByLike(userId);

  return res.status(200).json(data);
});

module.exports = {
  getProductDetail,
  getProductList,
  productByLike,
};
