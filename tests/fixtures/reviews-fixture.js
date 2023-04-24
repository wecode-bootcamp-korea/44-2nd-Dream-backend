const appDataSource = require('../../API/models/appDataSource');

const createReviews = async (reviewList) => {
  let data = [];

  for (let review of reviewList) {
    data.push([review.title, review.content, review.userId, review.productId]);
  }

  return appDataSource.query(
    `
      INSERT INTO reviews(
        title,
        content,
        user_id,
        product_id
        ) VALUES ?
    `,
    [data]
  );
};

const createReviewImages = async (reviewImageList) => {
  let data = [];

  for (let reviewImage of reviewImageList) {
    data.push([reviewImage.url, reviewImage.reviewId]);
  }

  return appDataSource.query(
    `
      INSERT INTO review_images (
        url,
        review_id
      ) VALUES ?
    `,
    [data]
  );
};

module.exports = {
  createReviews,
  createReviewImages,
};
