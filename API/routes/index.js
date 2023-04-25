const express = require('express');

const bidRouter = require('./bidRouter');
const userRouter = require('./userRouter');
const likeRouter = require('./likeRouter');
const productRouter = require('./productRouter');
const reviewRouter = require('./reviewRouter');
const searchRouter = require('./searchRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/bid', bidRouter.router);
router.use('/products', productRouter.router);
router.use('/review', reviewRouter.router);
router.use('/like', likeRouter.router);
router.use('/search', searchRouter.router);

module.exports = router;
