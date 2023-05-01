const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');

const isLike = async (proudctId, userId) => {
  try {
    const [isLike] = await appDataSource.query(
      `SELECT
      id
      FROM likes
      WHERE product_id = ?
      AND user_id = ?`,
      [proudctId, userId]
    );
    if (!isLike) return false;

    return true;
  } catch (err) {
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};

const createLike = async (proudctId, userId) => {
  try {
    const createLike = await appDataSource.query(
      `INSERT INTO likes(
          product_id,
          user_id
        ) VALUES (?,?)
      `,
      [proudctId, userId]
    );
    return createLike;
  } catch (err) {
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};

const deleteLike = async (proudctId, userId) => {
  try {
    const deleteLike = await appDataSource.query(
      `DELETE FROM likes
        WHERE product_id =?
        AND user_id =?
        `,
      [proudctId, userId]
    );
    return deleteLike;
  } catch (err) {
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};

module.exports = { isLike, createLike, deleteLike };
