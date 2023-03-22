const express = require('express');
const router = express.Router();
const user = require('../models/User');
const WatchlistController = require('../controllers/watchlist');
const { protect } = require("../middleware/auth");


router.get('/',protect,WatchlistController.getFullWatchList );
router.get('/:id', protect,WatchlistController.retrieveHousingDev);
router.post('/addToWatchlist',protect,WatchlistController.addToWatchlist);
router.delete('/removeFromWatchlist',protect,WatchlistController.removeFromWatchlist);


module.exports = router;