const paymentDao = require('../models/paymentDao');

const createBuyPayment = async ({
  addressId,
  userId,
  biddingId,
  dealNumber,
}) => {
  await paymentDao.buyingAddress({ addressId, userId, biddingId });
  await paymentDao.createBuyPayment(dealNumber);
  const [payment] = paymentDao.getBuyingPayment(dealNumber);
  return payment;
};

const createSellPayment = async ({
  cardNumberId,
  accountNumberId,
  userId,
  biddingId,
}) => {
  await paymentDao.createSellPayment({
    cardNumberId,
    accountNumberId,
    userId,
    biddingId,
  });
  const [createPayment] = paymentDao.getSellPayment(dealNumber);
  return createPayment;
};

const buyBidding = async ({ addressId, userId, biddingId }) => {
  await paymentDao.buyingAddress(addressId, userId, biddingId);
  const [bidingbuy] = await paymentDao.buyBidding(userId, biddingId);

  return bidingbuy;
};

const createSellBidding = async ({
  userId,
  cardNumberId,
  accountNumberId,
  biddingId,
}) => {
  await paymentDao.updateSellbiddingInfo({
    userId,
    cardNumberId,
    accountNumberId,
    biddingId,
  });
  const [biddingsell] = await paymentDao.getSellBidding(userId, biddingId);

  return biddingsell;
};

module.exports = {
  createSellPayment,
  createBuyPayment,
  buyBidding,
  createSellBidding,
};
