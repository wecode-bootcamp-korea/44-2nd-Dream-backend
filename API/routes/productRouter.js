const express = require('express');
const productController = require('../controllers/productController');
const checkLogInToken = require('../utils/auth');
const router = express.Router();

router.get('', productController.getProductList);
router.get('/like', checkLogInToken, productController.productByLike);
router.get('/:productId', productController.getProductDetail);

module.exports = {
  router,
};
