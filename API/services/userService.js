const userDao = require('../models/userDao');
const { BaseError } = require('../utils/error');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const signInKakao = async (kakaoToken) => {
  const result = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  if (result.status !== 200) {
    throw new BaseError('INVALID_KAKAO_TOKEN', 401);
  }
  const { data } = result;

  const nickname = data.properties.nickname;
  const email = data.kakao_account.email;
  const kakaoId = data.id;

  let user = await userDao.getUserByKakaoId(kakaoId);

  if (!user) {
    user = await userDao.createUser(kakaoId, nickname, email);
  }

  const payLoad = { id: user.id };

  const accessToken = jwt.sign(payLoad, process.env.SECRET_KEY);
  const name = user.nickname;
  return { accessToken: accessToken, nickname: name };
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const addressByUserId = async (userId) => {
  return await userDao.addressByUserId(userId);
};

const inputAddress = async (userId, address, detail_address, receiver) => {
  const addressId = await userDao.inputAddress(
    userId,
    address,
    detail_address,
    receiver
  );
  return addressId;
};

const inputNewAccount = async (accountNumber, userId) => {
  return userDao.inputNewAccount(accountNumber, userId);
};

const inputNewCard = async (cardNumber, userId) => {
  return userDao.inputNewCard(cardNumber, userId);
};

const getAccountListByUser = async (userId) => {
  return userDao.getAccountListByUser(userId);
};

const getCardListByUser = async (userId) => {
  return userDao.getCardListByUser(userId);
};

module.exports = {
  signInKakao,
  getUserById,
  inputNewAccount,
  inputNewCard,
  getAccountListByUser,
  getCardListByUser,
  inputAddress,
  addressByUserId,
};
