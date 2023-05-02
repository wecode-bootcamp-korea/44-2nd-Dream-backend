const bidDao = require('../models/bidDao');
const productDao = require('../models/productDao');
const { BaseError } = require('../utils/error');
const { BidCase } = require('../models/bidDao');

const graphByTerm = async (productId, term) => {
  let graphData = await bidDao.graphByTerm(productId, term);

  if (graphData.length == 0) throw new BaseError('NOT_DATA', 404);

  let bidPrice = [];
  let date = [];

  graphData = Array.isArray(graphData) ? graphData : [graphData];

  graphData.forEach((data) => {
    bidPrice.push(data.bid_price);
    date.push(data.date);
  });

  return { bidPrice: bidPrice, date: date };
};

const infoByproductId = async (productId) => {
  const { sellings, buyings } = await bidDao.bidInfo(productId);

  const deal = await bidDao.dealInfo(productId);
  return { selling: sellings, buying: buyings, deal: deal };
};

const inputBidPrice = async (productId, bidType, bidPrice, dueDate, userId) => {
  const bidCase = new BidCase(productId, bidType, bidPrice, dueDate, userId);
  return await bidCase.biddingIn();
};

const getBiddingInfo = async (productId, bidType, userId) => {
  const { productName, modelNumber, imageUrl } = await productDao.productDetail(
    productId
  );

  const bidCase = new BidCase(productId, bidType, '', '', userId);

  const biddingInfo = await bidCase.getBiddingInfo();

  const result = {
    dealId: biddingInfo.dealId,
    dealNumber: biddingInfo.dealNumber,
    biddingId: biddingInfo.biddingId,
    bidPrice: biddingInfo.bidPrice,
    commission: biddingInfo.bidPrice * bidCase.commissionRate,
    dueDate: biddingInfo.dueDate,
    productName: productName,
    modelNumber: modelNumber,
    imageUrl: imageUrl,
  };

  return result;
};

module.exports = {
  graphByTerm,
  infoByproductId,
  inputBidPrice,
  getBiddingInfo,
};
