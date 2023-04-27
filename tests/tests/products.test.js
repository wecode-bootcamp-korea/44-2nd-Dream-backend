const request = require('supertest');

const { createApp } = require('../../app');
const { truncateTables } = require('../test-client');
const { createUsers } = require('../fixtures/users-fixture');
const productFixture = require('../fixtures/products-fixture');
const appDataSource = require('../../API/models/appDataSource');

describe('prdouct detail', () => {
  let app;

  const firstProduct = {
    productName: '포르쉐 911',
    modelNumber: 'porche-asfgg-154342',
    categoryId: 2,
    originalPrice: 219900.0,
    productAgeId: 3,
    productLevel: 3,
  };

  const firstProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 1,
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

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await createUsers([userSeller, userBuyer, userDealer, userSuccess]);
    await productFixture.createProducts([firstProduct]);
    await productFixture.createProductImages([firstProductImage]);
    await productFixture.createBuyings([firstBuying, secondBuying]);
    await productFixture.createSellings([firstSelling, secondSelling]);
    await productFixture.createDeals([firstDeal]);
    await productFixture.createLikes([
      firstLike,
      secondLike,
      thirdLike,
      fourthLike,
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
      'premiumPercent',
    ]);
    expect(response.statusCode).toEqual(200);
  });

  test('FAIL: invalid productId', async () => {
    const response = await request(app).get('/products/12');
    expect(response.body).toEqual({ message: 'PRODUCT_DOES_NOT_EXIST' });
    expect(response.statusCode).toEqual(404);
  });
});
