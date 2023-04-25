const searchDao = require('../models/searchDao');

const search = async (limit, offset, keyword) => {
  return await searchDao.search(limit, offset, keyword);
};

module.exports = {
  search,
};
