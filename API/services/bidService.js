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

  if (sellings.length == 0 || buyings.length == 0)
    throw new BaseError('NOT_SELLINGS_DUYINGS_DATA', 404);

  const deal = await bidDao.dealInfo(productId);
  return { selling: sellings, buying: buyings, deal: deal };
};

const inputBidPrice = async (productId, bidType, bidPrice, dueDate, userId) => {
  const bidCase = new BidCase(productId, bidType, bidPrice, dueDate, userId);
  await bidCase.biddingIn();

  const { productName, modelNumber, imageUrl } = await productDao.productDetail(
    productId
  );
  const inputResult = {
    dealId: (bidCase.dealInfo && bidCase.dealInfo.id) || null,
    dealNumber: (bidCase.dealInfo && bidCase.dealInfo.dealNumber) || null,
    commission: bidCase.commissionRate * bidCase.bidPrice,
    productName: productName,
    modelNumber: modelNumber,
    imageUrl: imageUrl,
    dueDate: dueDate,
    bidPrice: bidCase.bidPrice,
    biddingId: bidCase.biddingId,
  };

  return inputResult;
};

module.exports = {
  graphByTerm,
  infoByproductId,
  inputBidPrice,
};
