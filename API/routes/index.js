const express = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/products', productRouter.router);

module.exports = router;
