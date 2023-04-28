const paymentService = require('../services/paymentService');
const { catchAsync, BaseError } = require('../utils/error');

const createBuyPayment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { addressId, dealNumber, biddingId } = req.body;
  if (!addressId || !dealNumber || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }
  const createPayment = await paymentService.createBuyPayment(
    addressId,
    userId,
    biddingId,
    dealNumber
  );

  return res.status(200).json(createPayment);
});
const buyBiding = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { addressId, biddingId } = req.body;
  if (!addressId || !biddingId) {
    throw new BaseError('KEY_ERROR', 400);
  }
  const buyBiding = await paymentService.buyBiding(
    addressId,
    userId,
    biddingId
  );
  return res.status(200).json(buyBiding);
});

module.exports = {
  createBuyPayment,
  buyBiding,
};
