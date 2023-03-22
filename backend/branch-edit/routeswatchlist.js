const express = require('express');
const router = express.Router();
const user = require('../models/User');
const WatchlistController = require(../controllers/watchlist);
const { protect } = require("../middleware/auth");


router.get('/',protect,WatchlistController.getFullWatchList );
router.get('/:id', protect,WatchlistController)

module.exports = router;