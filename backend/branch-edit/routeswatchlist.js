const express = require('express');
const router = express.Router();
const user = require('../models/User');
const WatchlistController = require('../controllers/watchlist');
const { protect } = require("../middleware/auth");


router.get('/:userId',protect,WatchlistController.getFullWatchList );
router.post('/:userId',protect,WatchlistController.addToWatchlist);
router.delete('/:userId/:itemId',protect,WatchlistController.removeFromWatchlist);
router.get('/:userId/:itemId', protect,WatchlistController.retrieveHousingDev);


module.exports = router;