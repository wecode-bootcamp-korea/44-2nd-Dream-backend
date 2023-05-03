const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const bidRouter = require('./bidRouter');
const paymentRouter = require('./paymentRouter');
const searchRouter = require('./searchRouter');
const likeRouter = require('./likeRouter');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/products', productRouter.router);
router.use('/bid', bidRouter.router);
router.use('/payment', paymentRouter.router);
router.use('/search', searchRouter.router);
router.use('/like', likeRouter.router);
router.use('/reviews', reviewRouter.router);

module.exports = router;
