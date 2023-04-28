const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [user] = await appDataSource.query(
      `
    SELECT
      id,
      email,
      nickname
    FROM users
    WHERE kakao_id  = ?
    `,
      [kakaoId]
    );

    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const getUserById = async (userId) => {
  try {
    const [user] = await appDataSource.query(
      `
      SELECT
        id,
        email,
        nickname
      FROM users
      WHERE id = ?
      `,
      [userId]
    );
    return user;
  } catch (error) {
    throw new DatabaseError('DataSource_Error');
  }
};

const createUser = async (kakaoId, nickname, email) => {
  try {
    await appDataSource.query(
      `
      INSERT INTO users(
        kakao_id,
        nickname,
        email
      )
      VALUES (?, ?, ?)
      `,
      [kakaoId, nickname, email]
    );

    const user = await appDataSource.query(
      `
      SELECT *
      FROM users
      WHERE kakao_id = ?
      `,
      [kakaoId]
    );
    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};
const inputAddress = async (userId, address, detail_address, receiver) => {
  const inputAddress = await appDataSource.query(
    `
  INSERT INTO addressses
   (user_id,address,detail_address,receiver)
   VALUES(?,?,?,?)
  `,
    [userId, address, detail_address, receiver]
  );

  return inputAddress.insertId;
};

const addressByUserId = async (userId) => {
  return await appDataSource.query(
    `
  SELECT
  address,
  detail_address,
  receiver,
  id AS addressId
  FROM addressses
  WHERE user_id =?
  `,
    [userId]
  );
};

module.exports = {
  getUserByKakaoId,
  getUserById,
  createUser,
  inputAddress,
  addressByUserId,
};
