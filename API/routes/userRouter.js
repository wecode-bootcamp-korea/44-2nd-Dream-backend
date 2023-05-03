const express = require('express');
const checkLogInToken = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/userInfo', checkLogInToken, userController.getUserById);
router.post('/address', checkLogInToken, userController.inputAddress);
router.get('/address', checkLogInToken, userController.getAddressByUserId);
router.post('/account', checkLogInToken, userController.inputNewAccount);
router.get('/account', checkLogInToken, userController.getAccountListByUser);
router.post('/card', checkLogInToken, userController.inputNewCard);
router.get('/card', checkLogInToken, userController.getCardListByUser);

module.exports = { router };
