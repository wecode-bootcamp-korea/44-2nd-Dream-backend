const express = require('express');
const productRouter = require('./productRouter');
const bidRouter = require('./bidRouter');
const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const bidRouter = require('./bidRouter');
const searchRouter = require('./searchRouter');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/bid', bidRouter.router);
router.use('/products', productRouter.router);
router.use('/like', likeRouter.router);
router.use('/reviews', reviewRouter.router);
router.use('/search', searchRouter.router);
router.use('/reviews', reviewRouter.router);

module.exports = router;
