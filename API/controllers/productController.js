const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await productService.getProductDetail(productId);
  return res.status(200).json(productDetail);
});

const getProductList = catchAsync(async (req, res) => {
  const { categoryId, ageId, levelId, sort, sortorder, limit, offset } =
    req.query;

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

module.exports = {
  getProductDetail,
  getProductList,
};
