const express = require('express');
const productController = require('../controllers/productController');
const checkLogInToken = require('../utils/auth');
const router = express.Router();

router.get('/like', checkLogInToken, productController.productByLike);
router.get('/:productId', productController.getProductDetail);
router.get('', productController.getProductList);

module.exports = {
  router,
};
