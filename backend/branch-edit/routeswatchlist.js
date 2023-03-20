const express = require('express');
const router = express.Router();
const auth = requrie('../middleware/auth');
const user = require('../models/User');
const WatchlistController = require(../controllers/watchlist);




router.get('/',auth,WatchlistController.getFullWatchList );
router.get('/:id', auth,WatchlistController)

module.exports = router;