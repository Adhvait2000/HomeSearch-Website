const mongoose = require('mongoose');
const User = require('../models/User');
const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');



exports.getFullWatchList = async (req,res,next) => {
    const userId = req.params.userId ;
    try {
        const userData = await User.findOne({_id: userId});
        res.json(userData.watchlist);
    }catch (err) {
        res.status(500).send(err) ;

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
    const itemId = req.params.itemId;
    try {
        const userData = await User.findById(userId).populate('watchlist');
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const itemIndex = userData.watchlist.findIndex(item =>item._id.toString()===itemId)
        if(itemIndex !== -1){
            return res.status(400).json({message: "Item already exists in watchlist"});

        }
        const item = await MainData.findById(itemId)
        if(!item){
            return res.status(404).json({message:"Housing data not found"});

        }
        userData.watchlist.push(item);
        await userData.save();
        res.json(userData.watchlist);
        
    }catch(err) {
        res.status(500).send({message : "watchlist add error"}) ;
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
            await userData.save();
            res.send ("Watchlist item removed.");
        }
    }catch(err){
        res.status(500).send(err);
    }
};

