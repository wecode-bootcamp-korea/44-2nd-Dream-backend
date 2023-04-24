const appDataSource = require('./appDataSource');
const { bidStatusEnum } = require('./enum');
const { DatabaseError } = require('../utils/error');
const graphQueryBuilder = require('./bidQueryBuilder');

class BidCase {
  constructor(productId, bidType, bidPrice) {
    this.bidType = bidType;
    this.bidPrice = bidPrice;
    this.productId = productId;
    this.counterpart = bidType == 'buying' ? 'selling' : 'buying';
    this.commissionRate = bidType == 'buying' ? 0.02 : 0.05;
    this.table = `${bidType}s`;
    this.counterTable = `${this.counterpart}s`;
    this.minOrMax = this.counterpart == 'selling' ? 'min' : 'max';
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

  getNowPrice() {
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
            WHERE d.created_at = (SELECT max(created_at) FROM deals) AND b.product_id = ${this.productId}
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
