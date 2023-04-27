const appDataSource = require('./appDataSource');
const { bidStatusEnum } = require('./enum');
const { DatabaseError } = require('../utils/error');

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
                b.bid_price bidPrice
            FROM deals d
            JOIN buyings b ON b.id = d.buying_id
            WHERE d.created_at = (SELECT max(created_at) FROM deals) AND b.product_id = ${this.productId}
            ORDER BY d.created_at DESC
            `
      );
      return parseFloat(Object.values(bidPrice));
    } catch (err) {
      err.message = 'DATABASE_ERROR';
      err.statusCode = 400;
      throw err;
    }
  }
}

module.exports = {
  BidCase,
};
