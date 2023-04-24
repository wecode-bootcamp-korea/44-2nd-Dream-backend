const request = require('supertest');

const { createApp } = require('../../app');
const { truncateTables } = require('../test-client');
const { createUsers } = require('../fixtures/users-fixture');
const productFixture = require('../fixtures/products-fixture');
const reviewFixture = require('../fixtures/reviews-fixture');
const appDataSource = require('../../API/models/appDataSource');
const { afterEach } = require('node:test');

describe('prdouct detail', () => {
  let app;

  const firstProduct = {
    productName: '포르쉐 911',
    productModelNumber: 'porche-asfgg-154342',
    categoryId: 2,
    originalPrice: 219900,
    productAgeId: 3,
    productLevel: 3,
  };

  const secondProduct = {
    productName: '포르쉐 911',
    productModelNumber: 'porche-asfgg-1543423',
    categoryId: 2,
    originalPrice: 2199000,
    productAgeId: 3,
    productLevel: 3,
  };

  const firstProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 1,
  };

  const secondProdcutImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 2,
  };

  const firstBuying = {
    userId: 2,
    productId: 1,
    bidPrice: 300000,
    bidStatusId: 1,
  };

  const secondBuying = {
    userId: 4,
    productId: 1,
    bidPrice: 500000,
    bidStatusId: 2,
  };
  const firstSelling = {
    userId: 1,
    productId: 1,
    bidPrice: 600000,
    bidStatusId: 1,
  };

  const secondSelling = {
    userId: 3,
    productId: 1,
    bidPrice: 500000,
    bidStatusId: 2,
  };

  const firstDeal = {
    buyingId: 2,
    sellingId: 2,
    buyingCommission: 30000,
    sellingCommission: 60000,
    dealStatusId: 1,
  };

  const userSeller = {
    kakaoId: 11234514,
    nickname: 'seller kim',
    email: 'testing3@test.com',
  };

  const userBuyer = {
    kakaoId: 11234515,
    nickname: 'buyer kim',
    email: 'testing4@test.com',
  };

  const userDealer = {
    kakaoId: 11234516,
    nickname: 'dealer kim',
    email: 'testing5@test.com',
  };

  const userSuccess = {
    kakaoId: 11234517,
    nickname: 'success kim',
    email: 'testing6@test.com',
  };

  const firstLike = {
    userId: 1,
    productId: 1,
  };

  const secondLike = {
    userId: 2,
    productId: 1,
  };

  const thirdLike = {
    userId: 3,
    productId: 1,
  };

  const fourthLike = {
    userId: 4,

    productId: 1,
  };

  const firstReview = {
    title: '리뷰에여',
    content: '내용은 없음',
    userId: 1,
    productId: 1,
  };

  const secondReview = {
    title: '리뷰에여2',
    content: '내용은 없음2',
    userId: 2,
    productId: 1,
  };

  const thirdReview = {
    title: '리뷰에여3',
    content: '내용은 없음3',
    userId: 3,
    productId: 1,
  };

  const fourthReview = {
    title: '리뷰에여4',
    content: '내용은 없음4',
    userId: 4,
    productId: 1,
  };

  const firstReview = {
    title: '리뷰에여',
    content: '내용은 없음',
    userId: 1,
    productId: 1,
  };

  const secondReview = {
    title: '리뷰에여2',
    content: '내용은 없음2',
    userId: 2,
    productId: 1,
  };

  const thirdReview = {
    title: '리뷰에여3',
    content: '내용은 없음3',
    userId: 3,
    productId: 1,
  };

  const fourthReview = {
    title: '리뷰에여4',
    content: '내용은 없음4',
    userId: 4,
    productId: 1,
  };

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await truncateTables([
      'users',
      'products',
      'product_images',
      'buyings',
      'sellings',
      'deals',
      'likes',
    ]);
    await createUsers([userSeller, userBuyer, userDealer, userSuccess]);
    await productFixture.createProducts([firstProduct, secondProduct]);
    await productFixture.createProductImages([
      firstProductImage,
      secondProdcutImage,
    ]);
    await productFixture.createBuyings([firstBuying, secondBuying]);
    await productFixture.createSellings([firstSelling, secondSelling]);
    await productFixture.createDeals([firstDeal]);
    await productFixture.createLikes([
      firstLike,
      secondLike,
      thirdLike,
      fourthLike,
    ]);
    await reviewFixture.createReviews([
      firstReview,
      secondReview,
      thirdReview,
      fourthReview,
    ]);
  });

  afterAll(async () => {
    await truncateTables([
      'users',
      'products',
      'product_images',
      'buyings',
      'sellings',
      'deals',
      'likes',
      'reviews',
    ]);
    await appDataSource.destroy();
  });

  test('SUCCESS: product Detail', async () => {
    const response = await request(app).get('/products/1');

    expect(Object.keys(response.body)).toEqual([
      'productName',
      'modelNumber',
      'categoryName',
      'originalPrice',
      'imageUrl',
      'productAge',
      'productLevel',
      'likeCount',
      'buyNowPrice',
      'sellNowPrice',
      'recentDealPrice',
    ]);
    expect(response.statusCode).toEqual(200);
  });

  test('SUCCESS: product list', async () => {
    const response = await request(app).get(
      '/products?limit=2&offset=0&sort=like&sortorder=desc'
    );

    expect(response.body.productAgeId).toEqual(3);
    expect(response.body.productLevelId).toEqual(3);
    expect(response.body.likeCount).toEqual(4);
    expect(response.body.reviewCount).toEqual(4);
    expect(response.statusCode).toEqual(200);
  });

  test('SUCCESS: product list', async () => {
    const response = await request(app).get(
      '/products?limit=2&offset=0&sort=like&sortorder=desc'
    );

    expect(response.body[0].productAgeId).toEqual(3);
    expect(response.body[0].productLevelId).toEqual(3);
    expect(response.body[0].likeCount).toEqual('4');
    expect(response.body[0].reviewCount).toEqual('4');
    expect(response.statusCode).toEqual(200);
  });

  test('FAIL: invalid productId', async () => {
    const response = await request(app).get('/products/12');
    expect(response.body).toEqual({ message: 'PRODUCT_DOES_NOT_EXIST' });
    expect(response.statusCode).toEqual(404);
  });
});
