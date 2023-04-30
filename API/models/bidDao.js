const appDataSource = require('./appDataSource');

const { bidStatusEnum } = require('./enum');
const { DatabaseError } = require('../utils/error');
const graphQueryBuilder = require('./bidQueryBuilder');

class BidCase {
  constructor(productId, bidType, bidPrice, dueDate, userId) {
    this.bidType = bidType;
    this.bidPrice = bidPrice;
    this.productId = productId;
    this.counterpart = bidType == 'buying' ? 'selling' : 'buying';
    this.commissionRate = bidType == 'buying' ? 0.02 : 0.05;
    this.counterCommissionRate = bidType == 'buying' ? 0.05 : 0.02;
    this.table = `${bidType}s`;
    this.counterTable = `${this.counterpart}s`;
    this.minOrMax = this.counterpart == 'selling' ? 'min' : 'max';
    this.dueDate = dueDate;
    this.userId = userId;
    this.appDataSource = appDataSource;
  }

  async nowPriceSetter(productIdValue, table, minOrMax) {
    try {
      const [bidPrice] = await this.appDataSource.query(
        ` 
        SELECT 
            bid_price bidPrice
        FROM ${table}
        WHERE bid_price = (SELECT ${minOrMax}(bid_price) FROM ${table} WHERE bid_status_id = ${bidStatusEnum.bid} AND product_id = ${productIdValue}) 
        `
      );

      if (bidPrice == undefined) {
        return null;
      }

      return parseFloat(Object.values(bidPrice));
    } catch (err) {
      err.message = 'DATABASE_ERROR';
      err.statusCode = 400;
      throw err;
    }
  }

  getBuyNowPrice() {
    return this.nowPriceSetter(this.productId, 'sellings', 'min');
  }

  getSellNowPrice() {
    return this.nowPriceSetter(this.productId, 'buyings', 'max');
  }

  async getNowPrice() {
    return this.nowPriceSetter(
      this.productId,
      this.counterTable,
      this.minOrMax
    );
  }

  async getRecentDealPrice() {
    try {
      const [bidPrice] = await this.appDataSource.query(
        ` 
            SELECT 
                b.bid_price AS bidPrice
            FROM deals d
            JOIN buyings b ON b.id = d.buying_id
            WHERE d.created_at = 
            (SELECT max(d.created_at) FROM deals JOIN buyings b ON b.id = d.buying_id WHERE b.product_id = ${this.productId}) 
            AND b.product_id = ${this.productId}
            ORDER BY d.created_at DESC
            `
      );

      if (bidPrice == undefined) {
        return null;
      }

      return parseFloat(Object.values(bidPrice));
    } catch (err) {
      console.log(err);
      err.message = 'DATABASE_ERROR';
      err.statusCode = 400;
      throw err;
    }
  }

  async isNowPrice() {
    const nowPrice = await this.getNowPrice();
    if (
      nowPrice &&
      ((this.bidType == 'buying' && this.bidPrice - nowPrice >= 0) ||
        (this.bidType == 'selling' && this.bidPrice - nowPrice <= 0))
    ) {
      this.bidPrice = nowPrice;
      return this.bidPrice;
    }
    return false;
  }

  async isExistingBid() {
    try {
      const [result] = await appDataSource.query(
        `SELECT EXISTS (
            SELECT
            id
            FROM ${this.table}
            WHERE user_id = ${this.userId} AND product_id = ${this.productId} AND bid_status_id = ${bidStatusEnum.bid}
            ) existing 
            `
      );
      return !!parseInt(result.existing);
    } catch (err) {
      err.message = 'DATABASE_ERROR';
      err.statusCode = 400;
      throw err;
    }
  }

  async biddingIn() {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.isNowPrice();
      if (await this.isExistingBid()) {
        await queryRunner.query(
          `UPDATE ${this.table}
        SET bid_price = ${this.bidPrice}
        WHERE user_id = ${this.userId} AND product_id = ${this.productId} AND bid_status_id = ${bidStatusEnum.bid}`
        );

        const [bidding] = await queryRunner.query(
          `SELECT
            id
        FROM ${this.table}
        WHERE user_id = ${this.userId} AND product_id = ${this.productId} AND bid_status_id = ${bidStatusEnum.bid}
        `
        );
        this.biddingId = bidding.id;
      } else {
        const bidding = await queryRunner.query(
          ` INSERT INTO ${this.table} (
                product_id,
                bid_price,
                due_date,
                user_id
                )
                VALUES (?, ?, ?, ?)`,
          [this.productId, this.bidPrice, this.dueDate, this.userId]
        );

        this.biddingId = bidding.insertId;
      }

      if (!(await this.isNowPrice())) {
        await queryRunner.commitTransaction();
        return;
      }

      const [partner] = await queryRunner.query(
        `SELECT
        id,
        user_id userId 
        FROM ${this.counterTable}
        WHERE updated_at = 
        (SELECT 
            min(updated_at)
        FROM ${this.counterTable}
        WHERE product_id = ${this.productId} AND bid_price = ${this.bidPrice} AND bid_status_id = ${bidStatusEnum.bid})
        AND product_id = ${this.productId} AND bid_price = ${this.bidPrice} AND bid_status_id = ${bidStatusEnum.bid}
        ORDER BY updated_at`
      );

      if (partner.userId == this.userId) {
        const err = new Error('SAME_USER_WITH_COUNTERPART');
        err.statusCode = 400;
        throw err;
      }

      await queryRunner.query(
        `UPDATE ${this.table} t
        JOIN ${this.counterTable} c
        SET t.bid_status_id = ${bidStatusEnum.deal},
            c.bid_status_id = ${bidStatusEnum.deal}
        WHERE t.id = ${this.biddingId} AND c.id = ${partner.id}`
      );

      const dealInput = await queryRunner.query(
        ` INSERT INTO deals (
            ${this.bidType + '_id'},
            ${this.counterpart + '_id'},
            ${this.bidType + '_commission'},
            ${this.counterpart + '_commission'}
            )
            VALUES (?, ?, ?, ?)`,
        [
          this.biddingId,
          partner.id,
          this.commissionRate * this.bidPrice,
          this.counterCommissionRate * this.bidPrice,
        ]
      );

      [this.dealInfo] = await queryRunner.query(
        `
        SELECT
            id,
            deal_number dealNumber
        FROM deals
        WHERE id = ?`,
        [dealInput.insertId]
      );

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      err.message = err.message || 'DATABASE_ERROR';
      err.statusCode = 400;
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

const graphByTerm = async (productId, term) => {
  try {
    let condition = new graphQueryBuilder(
      productId,
      term,
      bidStatusEnum.deal
    ).build();

    const data = await appDataSource.query(
      `SELECT product_id, 
      buyings.bid_price, 
      DATE_FORMAT(deals.created_at, '%Y-%m-%d') AS date
      FROM buyings
      JOIN deals
      ON deals.buying_id = buyings.id
   	  ${condition}
	    ORDER BY deals.created_at`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};
const bidInfo = async (productId, tableChange = 1) => {
  try {
    let buyingcondition = new graphQueryBuilder(
      productId,
      '',
      bidStatusEnum.bid,
      tableChange
    ).build();

    const buyings = await appDataSource.query(
      `SELECT bid_price AS bidPrice,
      COUNT(bid_price)AS quantity
      ${buyingcondition}
      GROUP BY bid_price`
    );
    let sellingcondition = new graphQueryBuilder(
      productId,
      '',
      bidStatusEnum.bid,
      tableChange,
      `sellings`
    ).build();

    const sellings = await appDataSource.query(
      `SELECT bid_price AS bidPrice,
      COUNT(bid_price)AS quantity
      ${sellingcondition}
      GROUP BY bid_price`
    );

    return { buyings: buyings, sellings: sellings };
  } catch (err) {
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};

const dealInfo = async (productId) => {
  try {
    let condition = new graphQueryBuilder(productId, '', '').build();

    return await appDataSource.query(
      `SELECT buyings.bid_price AS bidPrice,
      DATE_FORMAT(deals.created_at, '%Y-%m-%d') AS dates
      FROM deals
      JOIN buyings 
      ON deals.buying_id = buyings.id
      ${condition}
      ORDER BY deals.created_at DESC
  `
    );
  } catch (err) {
    throw new DatabaseError('INVALID_DATA_INPUT');
  }
};
module.exports = {
  graphByTerm,
  dealInfo,
  bidInfo,
  BidCase,
};
