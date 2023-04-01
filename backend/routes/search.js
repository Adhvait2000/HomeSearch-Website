const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const SearchController = require('../controllers/search');

router.get('/dropdown-data',protect,SearchController.getAllTownData );
router.get('/:districtNumber', protect, SearchController.getHousingList);
router.get('/:districtNumber/budgetOptions', protect,SearchController.getBudgetSearch);
router.get('/:housing_id', protect,SearchController.getSingleHouseDetails)

module.exports = router;
