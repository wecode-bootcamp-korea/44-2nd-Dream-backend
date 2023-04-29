const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');
const { bidStatusEnum } = require('./enum');

const checkBuyed = async (userId, productId) => {
  try {
    const deal = bidStatusEnum.deal;

    const [id] = await appDataSource.query(
      `
    SELECT
    id
    FROM buyings
    WHERE user_id = ?
    AND product_id = ?
    AND bid_status_id = ?`,
      [userId, productId, deal]
    );

    return id;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const createReview = async (userId, productId, content, title, url) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();
  try {
    const reviewId = await queryRunner.query(
      `
    INSERT INTO reviews
      (user_id,
      product_id,
      content,
      title)
    VALUES (?,?,?,?) 
    `,
      [userId, productId, content, title]
    );

    await queryRunner.query(
      `INSERT INTO review_images
      (review_id,
        url)
        VALUES(?,?)`,
      [reviewId.insertId, url]
    );

    return reviewId.insertId;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DataSource_Error');
  } finally {
    await queryRunner.release();
  }
};

module.exports = { createReview, checkBuyed };
