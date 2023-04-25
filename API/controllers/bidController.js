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

const inputBidPrice = catchAsync(async (req, res) => {
  const { productId, bidType, bidPrice, dueDate } = req.body;

  if (
    !productId ||
    !bidType ||
    !bidPrice ||
    !dueDate ||
    !(bidType == 'buying' || bidType == 'selling')
  ) {
    const error = new Error('KEY ERROR');
    error.statusCode = 400;
    throw error;
  }

  const userId = req.user.id;
  const inputResult = await bidService.inputBidPrice(
    productId,
    bidType,
    bidPrice,
    dueDate,
    userId
  );

  res.status(201).json(inputResult);
});

module.exports = {
  graphByTerm,
  infoByproductId,
  inputBidPrice,
};
