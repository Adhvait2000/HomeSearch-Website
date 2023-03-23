const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const PriceEstimatorController = require('../controllers/priceestimator');

router.get('/',protect,PriceEstimatorController.getPrices);

module.exports = router;
