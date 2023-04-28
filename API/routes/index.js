const express = require('express');

const bidRouter = require('./bidRouter');

const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const productRouter = require('./productRouter');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/bid', bidRouter.router);
router.use('/products', productRouter.router);
router.use('/review', reviewRouter.router);
router.use('/like', likeRouter.router);
router.use('/reviews', reviewRouter.router);

module.exports = router;
