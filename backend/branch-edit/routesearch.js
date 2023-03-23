const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const SearchController = require('../controllers/search');

router.get('/dropdown-data',protect,SearchController.getAllTownData );
router.get('/:districtNumber', protect, SearchController.getTownStatistics);
router.get('/query-search',protect,SearchController.getQuerySearch);
router.get('/:districtNumber/budgetOptions', protect,SearchController.getBudgetSearch);


module.exports = router;
