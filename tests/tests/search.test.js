const request = require('supertest');

const { createApp } = require('../../app');
const { truncateTables } = require('../test-client');
const productFixture = require('../fixtures/products-fixture');
const appDataSource = require('../../API/models/appDataSource');

describe('search', () => {
  let app;

  const firstProduct = {
    productName: '포르쉐 911',
    modelNumber: 'porche-asfgg-154343',
    categoryId: 2,
    originalPrice: 219900.0,
    productAgeId: 3,
    productLevel: 3,
  };

  const secondProduct = {
    productName: 'Jeep® Wrangler',
    modelNumber: 'Jeep®-asfgg-154342',
    categoryId: 2,
    originalPrice: 178000.0,
    productAgeId: 3,
    productLevel: 3,
  };

  const thridProduct = {
    productName: '2022 포드 GT',
    modelNumber: 'pordGT-asfgg-154342',
    categoryId: 2,
    originalPrice: 275000.0,
    productAgeId: 3,
    productLevel: 3,
  };

  const firstProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt3d62bb5d68e6dbd7/10295.jpg?format=webply&fit=bounds&quality=75&width=800&height=800&dpr=1',
    productId: 1,
  };

  const secondProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt5ca8d7adce06a3a4/42122.jpg?format=webply&fit=bounds&quality=100&width=320&height=320&dpr=1',
    productId: 2,
  };

  const thridProductImage = {
    url: 'https://www.lego.com/cdn/cs/set/assets/blt5014244d8d8dc8ad/42154.png?format=webply&fit=bounds&quality=100&width=320&height=320&dpr=1',
    productId: 3,
  };

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await productFixture.createProducts([
      firstProduct,
      secondProduct,
      thridProduct,
    ]);
    await productFixture.createProductImages([
      firstProductImage,
      secondProductImage,
      thridProductImage,
    ]);
  });

  afterAll(async () => {
    await truncateTables(['products', 'product_images']);
    await appDataSource.destroy();
  });

  test('SUCCESS: search', async () => {
    const response = await request(app).get(encodeURI(`/search?keyword=포`));
    expect(Object.keys(response.body[0])).toEqual([
      'productId',
      'productName',
      'productImage',
    ]);
    expect(response.statusCode).toEqual(200);
  });

  test('FAIL: invalid keyword', async () => {
    const response = await request(app).get(
      encodeURI(`/search?keyword=없어영`)
    );
    expect(response.body).toEqual([]);
    expect(response.statusCode).toEqual(200);
  });
});
