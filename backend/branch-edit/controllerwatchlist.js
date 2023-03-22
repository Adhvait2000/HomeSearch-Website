const mongoose = require('mongoose');
const User = require('../models/User');


exports.getFullWatchList = async (req,res,next) => {
    const userId = req.params.userId ;
    try {
        const userData = await User.findOne({_id: userId});
        res.json(userData.watchlist);
    }catch (err) {
        res.status(500).send(err)  ;

    }
};


exports.retrieveHousingDev = (req,res,next) => {
    const userId = req.params.userId ;
    const itemId = req.params.itemId;
    
};

exports.addToWatchlist = (req,res,next) => {

};


exports.removeFromWatchlist = async (req,res,next) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    
    try{
        const userData = await User.findOne({_id: userId});
        const curWatchlist = userData.watchlist;
        const watchlistItem = await curWatchlist.find({_id: itemId});

        if(!watchlistItem ){
            res.status (404).send("Watchlist not found.");
        }
        else{
            await watchlistItem.remove();
            res.send ("Watchlist iterm removed.");
        }
    }catch(err){
        res.status(500).send(err);
    }
};

