const paymentDao = require('../models/paymentDao');
const { BaseError } = require('../utils/error');

const createBuyPayment = async (addressId, userId, biddingId, dealNumber) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [payment] = await paymentDao.createBuyPayment(dealNumber);

  return payment;
};

const buyBidding = async (addressId, userId, biddingId) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [bidingbuy] = await paymentDao.buyBidding(userId, biddingId);

  return bidingbuy;
};

module.exports = { createBuyPayment, buyBidding };
