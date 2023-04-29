const express = require('express');
const productRouter = require('./productRouter');
const bidRouter = require('./bidRouter');
const userRouter = require('./userRouter');

const reviewRouter = require('./reviewRouter');
const router = express.Router();

router.use('/users', userRouter.router);
router.use('/bid', bidRouter.router);
router.use('/products', productRouter.router);
router.use('/review', reviewRouter.router);

module.exports = router;
