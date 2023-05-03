const schedule = require('node-schedule');
const appDataSource = require('../models/appDataSource');
const { bidStatusEnum } = require('../models/enum');

const job = schedule.scheduleJob('00 06 * * *', async () => {
  const bidStatus = bidStatusEnum.bid;
  const failStatus = bidStatusEnum.fail;

  let sellingId = await appDataSource.query(
    `SELECT 
    product_id,
    user_id
    FROM sellings
    WHERE due_date < NOW()
    AND bid_status_id = ${bidStatus}`
  );

  if (sellingId.length != 0) {
    let sellingProductId = [];
    let sellingUserId = [];

    sellingId.forEach((element) => {
      sellingProductId.push(element.product_id);
      sellingUserId.push(element.user_id);
    });

    let sellProductStr = sellingProductId.join();
    let sellUserStr = sellingUserId.join();

    await appDataSource.query(
      `
    UPDATE
    sellings
    SET bid_status_id = ${failStatus}
    WHERE product_id IN (${sellProductStr})
    AND user_id IN (${sellUserStr})
    `
    );
  }

  let buyingId = await appDataSource.query(
    `SELECT
    product_id,
    user_id
    FROM buyings
    WHERE due_date < NOW()
    AND bid_status_id = ${bidStatus}`
  );

  if (buyingId.length != 0) {
    const buyingProductId = [];
    const buyingUserId = [];

    buyingId.forEach((element) => {
      buyingProductId.push(element.product_id);
      buyingUserId.push(element.user_id);
    });

    let buyProductStr = buyingProductId.join();
    let buyUserStr = buyingUserId.join();

    await appDataSource.query(
      `
    UPDATE
    buyings
    SET bid_status_id = ${failStatus}
    WHERE product_id IN (${buyProductStr})
    AND user_id IN (${buyUserStr})
    `
    );
  }
});

module.exports = { job };
