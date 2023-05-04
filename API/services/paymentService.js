const paymentDao = require('../models/paymentDao');

const createBuyPayment = async (addressId, userId, biddingId, dealNumber) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [payment] = await paymentDao.createBuyPayment(dealNumber);

  return payment;
};

const createSellPayment = async (
  dealNumber,
  cardNumberId,
  accountNumberId,
  userId,
  biddingId
) => {
  const [createPayment] = await paymentDao.createSellPayment(
    dealNumber,
    cardNumberId,
    accountNumberId,
    userId,
    biddingId
  );

  return createPayment;
};

const buyBidding = async (addressId, userId, biddingId) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [bidingbuy] = await paymentDao.buyBidding(userId, biddingId);

  return bidingbuy;
};

const createSellBidding = async (
  cardNumberId,
  accountNumberId,
  userId,
  biddingId
) => {
  await paymentDao.updateSellbiddingInfo(
    cardNumberId,
    accountNumberId,
    userId,
    biddingId
  );
  const [biddingsell] = await paymentDao.getSellBidding(userId, biddingId);

  return biddingsell;
};

module.exports = {
  createSellPayment,
  createBuyPayment,
  buyBidding,
  createSellBidding,
};
