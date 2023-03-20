const express = require('express');
const router = express.Router();
const auth = requrie('../middleware/auth');
const SearchController = require(../controllers/search);

router.get('/dropdown',auth,SearchController.getAllTownNames );
router.get('/dropdown/:town', auth, SearchController.getTownStatistics);
router.get('')


module.exports = router;
