const express = require('express');
const productRouter = require('./productRouter');

const bidRouter = require('./bidRouter');

const router = express.Router();
const userRouter = require('./userRouter');

router.use('/users', userRouter.router);
router.use('/bid', bidRouter.router);
router.use('/products', productRouter.router);

module.exports = router;
