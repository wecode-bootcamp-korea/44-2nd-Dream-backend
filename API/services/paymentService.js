const paymentDao = require('../models/paymentDao');
const { BaseError } = require('../utils/error');

const createBuyPayment = async (addressId, userId, biddingId, dealNumber) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [payment] = await paymentDao.createBuyPayment(dealNumber);

  const productImage = payment.url;
  const totalAmount = Number(payment.bidPrice) + Number(payment.commission);

  return {
    productImage: productImage,
    totalAmount: totalAmount,
  };
};

const buyBiding = async (addressId, userId, biddingId) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [bidingbuy] = await paymentDao.buyBiding(userId, biddingId);

  return bidingbuy;
};

module.exports = { createBuyPayment, buyBiding };
