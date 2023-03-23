const mongoose = requrie ('mongoose');
const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');

exports.getAllTownNames = async (req,res, next)=>{
    try{
        const townsList = await TownStats.find({});
        res.json(townsList);
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}

exports.getTownStatistics = (req,res,next)=>{
    try{
        const districtNumber =  req.params.district ;
        const items = await 
    }                                    
}


