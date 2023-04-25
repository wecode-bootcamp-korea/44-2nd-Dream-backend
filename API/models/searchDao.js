const appDataSource = require('./appDataSource');
const { DatabaseError } = require('../utils/error');

const search = async (limit, offset, keyword) => {
  try {
    return await appDataSource.query(
      `SELECT
          products.id as productId,
          products.name as productName,
          product_images.url as productImage,
          categories.id as categoryId,
          categories.name as categoryName,
          product_ages.id as productAgeId,
          product_ages.age as productAge,
          product_levels.id as productLevelId,
          product_levels.level as productLevel
       FROM products
       LEFT JOIN product_images ON products.id = product_images.product_id
       LEFT JOIN categories ON products.category_id = categories.id
       LEFT JOIN product_ages ON products.product_age_id = product_ages.id
       LEFT JOIN product_levels ON products.product_level_id = product_levels.id
       WHERE (categories.name LIKE '%${keyword}%' OR products.name LIKE '%${keyword}%')
       LIMIT ? OFFSET ?
       `,
      [limit, offset]
    );
  } catch (err) {
    console.log(err);
    throw new DatabaseError(500, 'Database Error');
  }
};
//
module.exports = {
  search,
};
