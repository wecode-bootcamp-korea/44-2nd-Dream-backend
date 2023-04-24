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

module.exports = { getUserByKakaoId, getUserById, createUser };
