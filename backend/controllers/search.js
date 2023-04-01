const mongoose = require ('mongoose');
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
        const districtNum=  req.params.districtNumber;
        const items = await TownStats.find({districtNumber: districtNum});

        if(Object.keys(req.query).length==0){
            const results = await MainData.find({districtNumber: districtNum});
            const maxCount = 50;
            const limitedResults  = results.slice(0,maxCount);
            const data = { items, limitedResults};
            res.json(data);
    
        }
        else {
            const { maxPrice , buyOrRent, publicOrPrivate } = req.query;
            const queryParams = {};
            if (buyOrRent) queryParams.statusBuyRent = buyOrRent;
            if (publicOrPrivate) queryParams.propertyPrivatePublic = publicOrPrivate;
            if (maxPrice )queryParams.propertyPrice  =  { $exists : true ,$lte  :maxPrice };

            const results = await MainData.find(queryParams).select('_id districtNumber propertyPrivatePublic statusBuyRent propertyPrice ')
                            .sort({propertyPrice : -1})
                            .limit(100)    ;
            res.json(results);
            }

    }   catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong in search'});
    }                                 
};


exports.getQuerySearch = async(req,res,next)=>{
    
};


exports.getBudgetSearch = async(req,res,next)=>{
    const districtNum=  req.params.districtNumber ;
    const buyOrRent = req.query;

    const queryParams = {};
    if(buyOrRent) queryParams.buyOrRent = buyOrRent;
    


};







