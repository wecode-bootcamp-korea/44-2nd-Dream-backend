const express = require('express');
const productRouter = require('./productRouter');

const router = express.Router();

router.use('/products', productRouter.router);

module.exports = router;
