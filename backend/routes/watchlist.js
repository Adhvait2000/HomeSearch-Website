const express = require('express');
const router = express.Router();
const WatchlistController = require('../controllers/watchlist');
const { protect } = require("../middleware/auth");

//userId is the mongodb id of the user
// item id is the mongodb id of the housing development
//for add to watchlist post request send the mongoddb id as body

router.get('/:userId',protect,WatchlistController.getFullWatchList );
router.post('/:userId/:itemId',protect,WatchlistController.addToWatchlist); //
router.delete('/:userId/:itemId',protect,WatchlistController.removeFromWatchlist);
router.get('/:userId/:itemId', protect,WatchlistController.retrieveHousingDev);


module.exports = router;