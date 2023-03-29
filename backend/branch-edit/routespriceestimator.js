const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const PriceEstimatorController = require('../controllers/priceestimator');
const SearchController = require('../controllers/search');

router.get('/property-type-list',protect,PriceEstimatorController.getPropertyTypeList);
router.get('/dropdown-data',protect,SearchController.getAllTownData );
router.get ('/:districtNumber/:property-type/:public-private', protect,PriceEstimatorController.getEsamite);
router.get('/:districtNumber', protect, SearchController.getTownStatistics);


module.exports = router;
