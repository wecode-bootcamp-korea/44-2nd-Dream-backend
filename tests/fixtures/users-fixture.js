const appDataSource = require('../../API/models/appDataSource');

const createUsers = async (userList) => {
  let data = [];
  for (let user of userList) {
    data.push([user.kakaoId, user.nickname, user.email]);
  }

  return await appDataSource.query(
    `
    INSERT INTO users (
    kakao_id,
    nickname,
    email) 
    VALUES ?
    `,
    [data]
  );
};

module.exports = {
  createUsers,
};
