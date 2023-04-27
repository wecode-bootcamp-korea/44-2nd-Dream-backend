const appDataSource = require('./appDataSource');

const productDetail = async (productId) => {
  try {
    const [productDetail] = await appDataSource.query(
      `
        SELECT 
            p.name productName,
            p.model_number modelNumber,
            c.name categoryName,
            p.original_price originalPrice,
            pi.url imageUrl,
            pa.age productAge,
            pl.level productLevel,
            l.likeCount
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN product_images pi ON p.id = pi.product_id
        JOIN product_ages pa ON p.product_age_id = pa.id
        JOIN product_levels pl ON p.product_level_id = pl.id
        LEFT JOIN (SELECT 
            product_id,
            COUNT(id) likeCount
         FROM likes
         GROUP BY product_id) l ON l.product_id = p.id
        WHERE p.id = ?
              `,
      [productId]
    );
    return productDetail;
  } catch (err) {
    err.message = 'DATABASE_ERROR';
    err.statusCode = 400;
    throw err;
  }
};

const isExistingProduct = async (productId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS (
        SELECT
        id
        FROM products
        WHERE id = ?
        ) existing 
        `,
      [productId]
    );
    return !!parseInt(result.existing);
  } catch (err) {
    err.message = 'DATABASE_ERROR';
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  productDetail,
  isExistingProduct,
};
