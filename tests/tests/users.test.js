const request = require('supertest');

const axios = require('axios');
const { createApp } = require('../../app');
const appDataSource = require('../../API/models/appDataSource');

jest.mock('axios');

describe('Kakao Social Login', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await appDataSource.query('SET FOREIGN_KEY_CHECKS=1');

    await appDataSource.destroy();
  });

  test('😃 SUCCESS: Kakao Login for new user', async () => {
    const result = {
      status: 200,
      data: {
        id: 12345,
        properties: {
          nickname: '테스트',
        },
        kakao_account: {
          email: 'test@test.com',
        },
      },
    };

    axios.post = jest.fn().mockReturnValue(result);

    const res = await request(app).post('/users/kakaologin').send({
      kakaoToken: 'kakaoToken',
    });

    await expect(res.statusCode).toEqual(200);
  });

  test('😄 Kakao Login for existed user', async () => {
    const response = await request(app).post('/users/kakaologin').send({
      kakaoToken: 'kakaoToken',
    });

    await expect(response.statusCode).toEqual(200);
  });

  test('🤬 FAILED: unexisted token', async () => {
    await jest.resetAllMocks();

    const result = {
      status: -401,
      data: {
        account: 'redeyes',
        properties: {
          name: '길동',
        },
        disco: {
          tmoney: 'test',
        },
      },
    };

    axios.post = jest.fn().mockReturnValue(result);

    const response = await request(app)
      .post('/users/kakaologin')
      .send({
        kakaoToken: 'kakaoToken',
      })

      .expect(401)
      .expect({ message: 'INVALID_KAKAO_TOKEN' });
  });
});
