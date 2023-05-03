const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('', searchController.search);
router.get('/hottopics', searchController.getHotTopics);

module.exports = {
  router,
};
