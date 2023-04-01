const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const SearchController = require('../controllers/search');

router.get('/dropdown-data',protect,SearchController.getAllTownData );
router.get('/getHousingList/:districtNumber', protect, SearchController.getHousingList);
router.get('/getBudgetSearch/:districtNumber', protect,SearchController.getBudgetSearch);
router.get('/:houseid', protect,SearchController.getSingleHouseDetails)
router.get('/budget-towns', protect,SearchController.getBudgetTowns);

module.exports = router;

