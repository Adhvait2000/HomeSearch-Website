const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const PriceEstimatorController = require('../controllers/priceestimator');
const SearchController = require('../controllers/search');

router.get('/property-type-list', protect, PriceEstimatorController.getPropertyTypeList);
router.get('/dropdown-data', protect,SearchController.getAllTownData);
router.get ('/estimate-price', protect, PriceEstimatorController.getPrices);
router.get('/:districtNumber', protect, SearchController.getTownStatistics);
router.get('/estimate-price/:districtNumber', protect, PriceEstimatorController.getDistrictTypePrices)

module.exports = router;
