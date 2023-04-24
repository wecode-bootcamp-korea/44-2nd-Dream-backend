class graphQueryBuilder {
  constructor(
    productId,
    term,
    bidStatusId,
    tableChange = 0,
    table = `buyings`
  ) {
    this.productId = productId;
    this.term = term;
    this.bidStatusId = bidStatusId;
    this.table = table;
    this.tableChange = tableChange;
    this.condition = [];
    this.filter = ``;
  }
  tableChangeCondition() {
    if (this.tableChange) this.filter = `FROM ${this.table} ` + this.filter;
  }
  productIdCondition() {
    if (this.productId)
      this.condition.push(`${this.table}.product_id = ${this.productId}`);
  }

  termCondition() {
    if (this.term)
      this.condition.push(
        `deals.created_at >= (NOW() - INTERVAL ${this.term} DAY)`
      );
  }
  bidStatus() {
    if (this.bidStatusId)
      this.condition.push(
        ` ${this.table}.bid_status_id = ${this.bidStatusId} `
      );
  }

  mixCondition() {
    if (this.condition.length != 1) this.filter = this.condition.join(` AND `);
    if (this.condition.length == 1) this.filter = this.condition;
    this.filter = ` WHERE ` + this.filter;
  }
  build() {
    this.productIdCondition();
    this.termCondition();
    this.bidStatus();
    this.mixCondition();
    this.tableChangeCondition();
    return this.filter;
  }
}

module.exports = graphQueryBuilder;
