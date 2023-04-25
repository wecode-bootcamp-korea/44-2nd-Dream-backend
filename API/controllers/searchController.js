const searchService = require('../services/searchService');

const search = async (req, res) => {
  const { limit = 10, offset = 0, keyword } = req.query;

  const searchData = await searchService.search(
    parseInt(limit),
    parseInt(offset),
    keyword
  );

  return res.status(200).json(searchData);
};

module.exports = {
  search,
};
