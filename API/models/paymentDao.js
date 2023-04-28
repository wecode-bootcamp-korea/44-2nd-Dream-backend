const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');
const { dealStatusEnum } = require('./enum');

const buyBiding = async (userId, biddingId) => {
  try {
    return await appDataSource.query(
      `SELECT
      pi.url AS productImage,
      b.bid_price AS totalAmount,
      DATE_FORMAT(b.due_date, '%Y-%m-%d') AS dueDate
      FROM buyings b
      JOIN product_images pi ON pi.product_id = b.product_id 
      WHERE b.user_id = ?
      AND b.id = ?`,
      [userId, biddingId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};
const buyingAddress = async (addressId, userId, biddingId) => {
  try {
    await appDataSource.query(
      `
    UPDATE buyings
    SET address_id = ?
    WHERE user_id = ?
    AND buyings.id =?
    `,
      [addressId, userId, biddingId]
    );
  } catch (err) {
    throw new DatabaseError('DATABASE_ERROR');
  }
};

const createBuyPayment = async (dealNumber) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();
  try {
    const paymentDone = dealStatusEnum.paymentDone;

    await queryRunner.query(
      `
    UPDATE deals
    SET deal_status_id =?
    WHERE deal_number = ? `,
      [paymentDone, dealNumber]
    );
    const payment = await queryRunner.query(
      `
    SELECT
    pi.url AS url,
    d.buying_commission AS commission,
    s.bid_price AS bidPrice
    FROM product_images pi
    JOIN sellings s
    ON pi.product_id = s.product_id
    JOIN deals d
    ON d.selling_id = s.id
    WHERE d.deal_number = ?
    `,
      [dealNumber]
    );

    await queryRunner.commitTransaction();

    return payment;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new DatabaseError('DATABASE_ERROR');
  } finally {
    await queryRunner.release();
  }
};

module.exports = { createBuyPayment, buyBiding, buyingAddress };
