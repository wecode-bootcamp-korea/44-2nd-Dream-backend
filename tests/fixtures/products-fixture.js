const appDataSource = require('../../API/models/appDataSource');

const createProducts = async (productList) => {
  let data = [];
  for (let product of productList) {
    data.push([
      product.productName,
      product.modelNumber,
      product.categoryId,
      product.originalPrice,
      product.productAgeId,
      product.productLevel,
    ]);
  }

  return await appDataSource.query(
    `
    INSERT INTO products (
    name,
    model_number,
    category_id,
    original_price,
    product_age_id,
    product_level_id) 
    VALUES ?
    `,
    [data]
  );
};

const createProductImages = async (imageList) => {
  let data = [];
  for (let image of imageList) {
    data.push([image.url, image.productId]);
  }

  return await appDataSource.query(
    `
      INSERT INTO product_images (
      url,
      product_id) 
      VALUES ?
      `,
    [data]
  );
};

const createBuyings = async (buyingList) => {
  let data = [];
  for (let buying of buyingList) {
    data.push([
      buying.userId,
      buying.productId,
      buying.bidPrice,
      buying.bidStatusId,
    ]);
  }

  return appDataSource.query(
    `
        INSERT INTO buyings (
        user_id,
        product_id,
        bid_price,
        bid_status_id) 
        VALUES ?
        `,
    [data]
  );
};

const createSellings = async (sellingList) => {
  let data = [];
  for (let selling of sellingList) {
    data.push([
      selling.userId,
      selling.productId,
      selling.bidPrice,
      selling.bidStatusId,
    ]);
  }

  return await appDataSource.query(
    `
        INSERT INTO sellings (
        user_id,
        product_id,
        bid_price,
        bid_status_id) 
        VALUES ?
        `,
    [data]
  );
};

const createDeals = async (dealList) => {
  let data = [];
  for (let deal of dealList) {
    data.push([
      deal.buyingId,
      deal.sellingId,
      deal.buyingCommission,
      deal.sellingCommission,
      deal.dealStatusId,
    ]);
  }

  return await appDataSource.query(
    `
        INSERT INTO deals (
        buying_id,
        selling_id,
        buying_commission,
        selling_commission,
        deal_status_id) 
        VALUES ?
        `,
    [data]
  );
};

const createLikes = async (likeList) => {
  let data = [];
  for (let like of likeList) {
    data.push([like.userId, like.productId]);
  }

  return await appDataSource.query(
    `
          INSERT INTO likes (
          user_id,
          product_id)
          VALUES ?
          `,
    [data]
  );
};

module.exports = {
  createProducts,
  createProductImages,
  createBuyings,
  createSellings,
  createDeals,
  createLikes,
};
