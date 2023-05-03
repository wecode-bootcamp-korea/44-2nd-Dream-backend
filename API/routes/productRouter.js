const express = require('express');
const checkLogInToken = require('../utils/auth');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('', productController.getProductList);
router.get('/like', checkLogInToken, productController.getProductByLike);
router.get('/:productId', productController.getProductDetail);

module.exports = {
  router,
};
