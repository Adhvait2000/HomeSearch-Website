const { query } = require('express');
const mongoose = require ('mongoose');
const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');

exports.getTownStatistics  = async (req, res, next) => {
    const districtNumber = req.params.districtNumber;
    try {
        const townData = await TownStats.find({districtNumber: districtNumber});
        res.json(townData);
    }catch (err) {
        console.error(err);
        res.status(500).send({message: "Server error town statss"});
    }
};


exports.getSingleHouseDetails = async (req, res, next) => {
    try {
        const houseData = await MainData.findById(req.params.houseid);
        if (!houseData) {
            return res.status(404).send("House not found");
        }
        res.json(houseData);
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }

};


exports.getBudgetTowns = async (req, res, next) => {
    
    try{
        const budgetTowns = await TownStats.find({}).select('_id districtNumber generalLocation averagePriceAll')
                        .sort({avgeragePriceAll : 1})
                        .limit(7);
    res.json(budgetTowns);
    }catch (err){
        console.log(err);
        res.status(500).send("Server error");
    }

};

exports.getAllTownData = async (req,res, next)=>{
    try{
        const townsList = await TownStats.find({}).sort({districtNumber:-1});
        res.json(townsList); 
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.getHousingList = async(req,res,next)=>{
    try{
        const districtNum=  req.params.districtNumber;
        const items = await TownStats.find({districtNumber: districtNum});
        if(Object.keys(req.query).length==0){
            const results = await MainData.find({districtNumber: districtNum }).select('_id statusBuyRent propertyPrivatePublic districtNumber propertyType propertyPrice');
            const maxCount = 50;
            const limitedResults  = results.slice(0,maxCount);
            const data = { items, limitedResults};
            res.json(data);
    
        }
        else {
            let results ;
            const { maxPrice , buyOrRent, publicOrPrivate } = req.query;
            const queryParams = {};
            queryParams.districtNumber = districtNum;
            if (buyOrRent) queryParams.statusBuyRent = buyOrRent;
            if (publicOrPrivate) queryParams.propertyPrivatePublic = publicOrPrivate;
            if (maxPrice){
                if(buyOrRent=="Buy")
                {
                    queryParams.propertyPrice  =  { $exists : true ,$lte  :maxPrice };

                     results = await MainData.find(queryParams).select('_id districtNumber propertyPrivatePublic statusBuyRent propertyPrice ')
                    .sort({propertyPrice : -1})
                    .limit(50)  ;
                }
                else if (buyOrRent=="Rent") {
                    queryParams.rentalPriceSqft = { $exists : true ,$lte :maxPrice };
                     results = await MainData.find(queryParams).select('_id districtNumber propertyPrivatePublic statusBuyRent rentalPriceSqft')
                    .sort({rentalPriceSqft : -1})
                    .limit(50)  ;
                }
                else {
                    const query1 = queryParams;
                    query1.propertyPrice = { $exists : true , $lte : maxPrice };
                    const query2 = queryParams;
                    query2.rentalPriceSqft =   {$exists:true, $lte :maxPrice};
    
    
                    const arr1Result  = await MainData.find(query1)
                        .select('_id districtNumber propertyPrivatePublic statusBuyRent  propertyPrice')
                        .limit(25)
                        .sort({propertyPrice: -1}) ;
    
                    const arr2Result = await MainData.find(query2)
                        .select('_id districtNumber propertyPrivatePublic statusBuyRent rentalPriceSqft')
                        .limit (25)
                        .sort({rentalPriceSqft: -1 });
    
                    results = [...arr1Result, ...arr2Result];
                }
    

            }
            else {
                if(buyOrRent == "Buy"){
                    queryParams.propertyPrice  =  { $exists : true };
                    results = await MainData.find(queryParams)
                        .select ('_id districtNumber propertyPrivatePublic statusBuyRent')
                        .limit(50);
                }
                else if (buyOrRent == "Rent"){
                    queryParams.rentalPriceSqft = {  $exists: true };
                    results = await MainData.find(queryParams)
                    .select('_id districtNumber propertyPrivatePublic statusBuyRent')
                    .limit(50);
                }
                else {
                    results = await MainData.find(queryParams)
                        .select('_id districtNumber propertyPrivatePublic statusBuyRent')
                        .limit(50) ;
                }
            }
            res.json(results);
            }

    } catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong in search'});
    }                                 
};


exports.getBudgetSearch = async(req,res,next)=>{
    const districtNum=  req.params.districtNumber ;
    let results ;
    const {maxPrice , buyOrRent, publicOrPrivate} = req.query;
    const queryParams = {};
    queryParams.districtNumber = districtNum;

    if(buyOrRent) queryParams.statusBuyRent = buyOrRent;
    if(publicOrPrivate) queryParams.propertyPrivatePublic = publicOrPrivate;

        if (maxPrice){
            if(buyOrRent=="Buy")
            {
                queryParams.propertyPrice  =  { $exists : true ,$lte  :maxPrice };

                 results = await MainData.find(queryParams).select('_id districtNumber propertyPrivatePublic statusBuyRent propertyPrice ')
                .sort({propertyPrice : 1})
                .limit(50)  ;
            }
            else if (buyOrRent=="Rent") {
                queryParams.rentalPriceSqft = { $exists : true ,$lte :maxPrice };
                 results = await MainData.find(queryParams).select('_id districtNumber propertyPrivatePublic statusBuyRent rentalPriceSqft')
                .sort({rentalPriceSqft : 1})
                .limit(50)  ;
            }
            else {
                const query1 = queryParams;
                query1.propertyPrice = { $exists : true , $lte : maxPrice };
                const query2 = queryParams;
                query2.rentalPriceSqft =   {$exists:true, $lte :maxPrice};


                const arr1Result  = await MainData.find(query1)
                    .select('_id districtNumber propertyPrivatePublic statusBuyRent  propertyPrice')
                    .limit(25)
                    .sort({propertyPrice: 1}) ;

                const arr2Result = await MainData.find(query2)
                    .select('_id districtNumber propertyPrivatePublic statusBuyRent rentalPriceSqft')
                    .limit (25)
                    .sort({rentalPriceSqft:1 });

                results = [...arr1Result, ...arr2Result];
            }

        }
        else {
            if(buyOrRent == "Buy"){
                queryParams.propertyPrice  =  { $exists : true };
                results = await MainData.find(queryParams)
                    .select ('_id districtNumber propertyPrivatePublic statusBuyRent')
                    .limit(50)
                    .sort({propertyPrice: 1});
            }
            else if (buyOrRent == "Rent"){
                queryParams.rentalPriceSqft = {  $exists: true };
                results = await MainData.find(queryParams)
                .select('_id districtNumber propertyPrivatePublic statusBuyRent')
                .limit(50)
                .sort({rentalPriceSqft:1});
            }
            else {
                const query1 = queryParams;
                query1.propertyPrice = { $exists : true };
                const query2 = queryParams;
                query2.rentalPriceSqft =   {$exists:true};


                const arr1Result  = await MainData.find(query1)
                    .select('_id districtNumber propertyPrivatePublic statusBuyRent  propertyPrice')
                    .limit(25)
                    .sort({propertyPrice: 1}) ;

                const arr2Result = await MainData.find(query2)
                    .select('_id districtNumber propertyPrivatePublic statusBuyRent rentalPriceSqft')
                    .limit (25)
                    .sort({rentalPriceSqft:1 });

                results = [...arr1Result, ...arr2Result];
            }
        }

        res.json(results);
    
};







