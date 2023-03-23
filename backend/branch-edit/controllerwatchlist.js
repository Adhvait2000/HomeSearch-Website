const mongoose = require('mongoose');
const User = require('../models/User');
const MainData = require('../models/MainData');

exports.getFullWatchList = async (req,res,next) => {
    const userId = req.params.userId ;
    try {
        const userData = await User.findOne({_id: userId});
        res.json(userData.watchlist);
    }catch (err) {
        res.status(500).send(err)  ;

    }
};

exports.retrieveHousingDev = async(req,res,next) => {
    const userId = req.params.userId ;
    const itemId = req.params.itemId;

    try {
        const userData = await User.findOne({_id: userId});
        const curWatchlist = userData.watchlist;
        const watchlistItem = await curWatchlist.find({_id: itemId});

        if(!watchlistItem ){
            res.status (404).send("Watchlist item not found.");
        }
        else{
            res.json(watchlistItem);
        }
    }catch(err) {
        res.status(500).send(err) ;
    }
};

exports.addToWatchlist = async (req,res,next) => {
    const userId = req.params.userId;

    try {
        const itemId = req.body.itemId;
        const userData = await User.findOne({_id: userId});
        const curWatchlist = userData.watchlist;
        const housingData = MainData.findOne({_id:itemId});

        if(!housingData ){
            res.status (404).send("Watchlist item not found.");
        }
        else{
            curWatchlist.push(housingData);
        }

       await User.save();
       const newWatchlist = await User.findOne({_id:userId}).watchlist;;

        res.json(newWatchlist);


    }catch(err) {
        res.status(500).send(err) ;
    }
};


exports.removeFromWatchlist = async (req,res,next) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    
    try{
        const userData = await User.findOne({_id: userId});
        const curWatchlist = userData.watchlist;
        const watchlistItem = await curWatchlist.find({_id: itemId});

        if(!watchlistItem ){
            res.status (404).send("Watchlist item not found.");
        }
        else{
            await watchlistItem.remove();
            res.send ("Watchlist item removed.");
        }
    }catch(err){
        res.status(500).send(err);
    }
};

