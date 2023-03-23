const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");
const SearchController = require('../controllers/search');

router.get('/dropdown-data',protect,SearchController.getAllTownNames );
router.get('/:districtNumber', protect, SearchController.getTownStatistics);
router.get('/  ')


module.exports = router;
