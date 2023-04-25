const request = require('supertest');

const { createApp } = require('../../app');
const { truncateTables } = require('../test-client');
const { createUsers } = require('../fixtures/users-fixture');
const productFixture = require('../fixtures/products-fixture');
const appDataSource = require('../../API/models/appDataSource');

describe('isLike', () => {
  let app;
  const firstProduct = {
    productName: '포르쉐 911',
    modelNumber: 'porche-asfgg-51914967',
    categoryId: 2,
    originalPrice: 219900.0,
    productAgeId: 3,
    productLevel: 3,
  };

  const firstProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 1,
  };
  const secondProduct = {
    productName: '포르쉐 911',
    modelNumber: 'porche-asfgg-0618',
    categoryId: 2,
    originalPrice: 219900.0,
    productAgeId: 3,
    productLevel: 3,
  };
  const secondProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 2,
  };
  const firstBuying = {
    userId: 2,
    productId: 1,
    bidPrice: 300000,
    bidStatusId: 2,
  };

  const secondBuying = {
    userId: 4,
    productId: 2,
    bidPrice: 500000,
    bidStatusId: 1,
  };
  const thBuying = {
    userId: 4,
    productId: 1,
    bidPrice: 500000,
    bidStatusId: 1,
  };

  const firstSelling = {
    userId: 1,
    productId: 2,
    bidPrice: 600000,
    bidStatusId: 1,
  };

  const secondSelling = {
    userId: 3,
    productId: 1,
    bidPrice: 500000,
    bidStatusId: 2,
  };
  const thSelling = {
    userId: 1,
    productId: 1,
    bidPrice: 600000,
    bidStatusId: 1,
  };

  const firstDeal = {
    buyingId: 2,
    sellingId: 2,
    buyingCommission: 30000,
    sellingCommission: 60000,
    dealStatusId: 1,
  };

  const userSeller = {
    kakaoId: 618,
    nickname: 'seller kim',
    email: 'testing3@test.com',
  };

  const userBuyer = {
    kakaoId: 1221,
    nickname: 'buyer kim',
    email: 'testing4@test.com',
  };

  const userDealer = {
    kakaoId: 224,
    nickname: 'dealer kim',
    email: 'testing5@test.com',
  };

  const userSuccess = {
    kakaoId: 4967,
    nickname: 'success kim',
    email: 'testing6@test.com',
  };

  const firstLike = {
    userId: 1,
    productId: 2,
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
      secondProductImage,
    ]);
    await productFixture.createBuyings([firstBuying, secondBuying, thBuying]);
    await productFixture.createSellings([
      firstSelling,
      secondSelling,
      thSelling,
    ]);
    await productFixture.createDeals([firstDeal]);
    await productFixture.createLikes([firstLike]);
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

  test('SUCCESS: create like', async () => {
    const response = await request(app).get('/like/1').send({ userId: 1 });

    expect(response.body).toEqual({ message: 'CREATE_LIKE' });
    expect(response.statusCode).toEqual(201);
  });
  test('SUCCESS: delete like', async () => {
    const response = await request(app).get('/like/1').send({ userId: 1 });

    expect(response.statusCode).toEqual(204);
  });
  test('SUCCESS: like list', async () => {
    const response = await request(app).get('/like').send({ userId: 1 });

    expect(response.body).toEqual([
      {
        categoryName: 'Car',
        immediateSalePrice: '500000.00',
        productId: 2,
        productImage:
          'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
        productModelNumber: 'porche-asfgg-0618',
        productName: '포르쉐 911',
      },
    ]);
    expect(response.statusCode).toEqual(200);
  });
});
