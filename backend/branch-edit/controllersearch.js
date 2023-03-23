const mongoose = requrie ('mongoose');
const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');

exports.getAllTownData = async (req,res, next)=>{
    try{
        const townsList = await TownStats.find({});
        res.json(townsList);
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.getTownStatistics = async(req,res,next)=>{
    try{
        if(Object.keys(req.query).length==0){
            const districtNum=  req.params.districtNumber ;
            const items = await TownStats.find({districtNumber: districtNum});
            const results = await MainData.find({districtNumber: districtNum});
            const maxCount = 50;
            const limitedResults  = results.slice(0,maxCount);
            const data = { items , limitedResults};

            res.json(data);
    
        }
        else {
            
        }



    }   catch(err){
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }                                 
};

exports.getQuerySearch = async(req,res,next)=>{
    
};


exports.getBudgetOptions = async(req,res,next)=>{

};







