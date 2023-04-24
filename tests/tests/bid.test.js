const request = require('supertest');

const { createApp } = require('../../app');
const { truncateTables } = require('../test-client');
const { createUsers } = require('../fixtures/users-fixture');
const productFixture = require('../fixtures/products-fixture');
const appDataSource = require('../../API/models/appDataSource');

describe('graph/info API', () => {
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
    kakaoId: 112345142,
    nickname: 'seller kim',
    email: 'testing3@test.com',
  };

  const userBuyer = {
    kakaoId: 112345152,
    nickname: 'buyer kim',
    email: 'testing4@test.com',
  };

  const userDealer = {
    kakaoId: 112345162,
    nickname: 'dealer kim',
    email: 'testing5@test.com',
  };

  const userSuccess = {
    kakaoId: 112345172,
    nickname: 'success kim',
    email: 'testing6@test.com',
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
  });

  afterAll(async () => {
    await truncateTables([
      'users',
      'products',
      'product_images',
      'buyings',
      'sellings',
      'deals',
    ]);
    await appDataSource.destroy();
  });

  test('SUCCESS:graph info', async () => {
    const response = await request(app).get('/bid/graph/1');

    expect(response.body.bidPrice).toEqual(['500000.00']);
    expect(response.body.date).toEqual(['2023-04-28']);
    expect(response.statusCode).toEqual(200);
  });

  test('🤬fail:NOT_productId', async () => {
    const response = await request(app).get('/bid/graph/4');

    expect(response.body).toEqual({ message: 'NOT_DATA' });
    expect(response.statusCode).toEqual(404);
  });
  test('SUCCESS:info sellings / buyings / deal', async () => {
    const response = await request(app).get('/bid/info/1');

    expect(response.body.selling).toEqual([
      { bidPrice: '600000.00', quantity: '1' },
    ]);
    expect(response.body.buying).toEqual([
      { bidPrice: '300000.00', quantity: '1' },
    ]);
    expect(response.body.deal).toEqual([
      { bidPrice: '500000.00', dates: '2023-04-28' },
    ]);
    expect(response.statusCode).toEqual(200);
  });

  test('🤬:isellings / isbuyings ', async () => {
    const response = await request(app).get('/bid/info/4');

    expect(response.body).toEqual({ message: 'NOT_SELLINGS_DUYINGS_DATA' });
    expect(response.statusCode).toEqual(404);
  });
});
