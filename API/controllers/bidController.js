const bidService = require('../services/bidService');
const { catchAsync, BaseError } = require('../utils/error');

const graphByTerm = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const { term } = req.query;

  const data = await bidService.graphByTerm(productId, term);

  return res.status(200).json(data);
});

const infoByproductId = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const data = await bidService.infoByproductId(productId);

  return res.status(200).json(data);
});
module.exports = {
  graphByTerm,
  infoByproductId,
};
