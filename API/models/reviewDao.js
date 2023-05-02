const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');
const { bidStatusEnum } = require('./enum');
const { query } = require('express');

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

const getReviewByProductId = async (productId) => {
  try {
    const getReview = await appDataSource.query(
      `
      SELECT
        u.nickname AS userNickname,
        u.email AS userEmail,
        ri.url AS reviewImageUrl,
        r.id AS reviewId,
        r.content AS reviewContent,
        r.title AS reviewTitle
      FROM reviews AS r
      LEFT JOIN users AS u ON u.id = r.user_id
      LEFT JOIN review_images AS ri ON r.id = ri.review_id
      WHERE r.product_id = ${productId}
      `
    );
    return getReview;
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

const deleteReview = async (reviewId) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
    DELETE
    FROM review_images
    WHERE review_id = ?
    `,
      [reviewId]
    );
    await queryRunner.query(
      `
    DELETE FROM reviews
      WHERE id = ?
      `,
      [reviewId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DataSource_Error');
  } finally {
    await queryRunner.release();
  }
};

const updateReview = async (userId, reviewId, title, content, url) => {
  try {
    const aa = await appDataSource.query(
      `UPDATE reviews
        LEFT JOIN review_images ON (reviews.id = review_images.review_id)
          SET 
            reviews.title = ?,
            reviews.content = ?,
            review_images.url = ?
          WHERE reviews.user_id = ? AND reviews.id = ?
    `,
      [title, content, url, userId, reviewId]
    );
  } catch (err) {
    throw new DatabaseError(400, 'Database Error');
  }
};

const verificationReviewId = async (reviewId) => {
  try {
    const [result] = await appDataSource.query(
      `
        SELECT EXISTS (
          SELECT
            id
          FROM reviews
          WHERE id = ?
        ) as existing
      `,
      [reviewId]
    );
    return !!parseInt(result.existing);
  } catch {
    throw new DatabaseError(500, 'DatabaseError');
  }
};

module.exports = {
  createReview,
  checkBuyed,
  getReviewByProductId,
  deleteReview,
  updateReview,
  verificationReviewId,
};
