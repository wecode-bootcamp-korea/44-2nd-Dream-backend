const userService = require('../services/userService');
const { catchAsync, BaseError } = require('../utils/error');

const signInKakao = catchAsync(async (req, res) => {
  const { kakaoToken } = req.body;

  if (!kakaoToken) throw new BaseError(401, 'NEED_KAKAOTOKEN');

  const { accessToken, name } = await userService.signInKakao(kakaoToken);

  return res.status(200).json({ token: accessToken, nickname: name });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userInfo = await userService.getUserById(userId);

  return res.status(200).json(userInfo);
});

const inputAddress = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address, detail_address, receiver } = req.body;
  if (!address || !detail_address || !receiver) {
    throw new BaseError('KEY_ERROR', 400);
  }
  const addressId = await userService.inputAddress(
    userId,
    address,
    detail_address,
    receiver
  );

  return res.status(201).json({ addressId: addressId });
});

const addressByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const addresses = await userService.addressByUserId(userId);
  return res.status(200).json(addresses);
});
module.exports = { signInKakao, getUserById, addressByUserId, inputAddress };
