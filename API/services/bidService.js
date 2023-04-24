const bidDao = require('../models/bidDao');
const { BaseError } = require('../utils/error');

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
module.exports = {
  graphByTerm,
  infoByproductId,
};
