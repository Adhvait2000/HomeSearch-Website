const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');
const fs = require('fs');
const path = require('path');

// exports.getDistrictTypePrices = async (req, res, next) => {
//     const {districtNumber} = req.params;
//     try {
//         const houseTypes  = await  MainData.find({
//             districtNumber : districtNumber,
//             statusBuyRent: "Buy",
//             propertyPrice :  {$exists: true}

//         }).distinct('propertyType');
//         const averagePrices = await Promise.all(houseTypes.map(async (houseType) =>{
//             const houses = await MainData.find({});
//             const prices = houses.map()
//         }))
//     }
// };

exports.getDistrictTypePrices = async (req, res, next) => {
    const districtNumber = req.params.districtNumber;
    const buyStatus  = "Buy";

    const results = await MainData.aggregate([
        {$match : {districtNumber : districtNumber,statusBuyRent :buyStatus, propertyPrice : {$exists : true}}},
        {$group:{
            _id : '$propertyType',
            avgPrice :{ $avg : '$propertyPrice' }
        }}
    ]);
    res.json(results);
}

exports.getPrices = async(req, res, next)=>{

    const districtNumber = parseInt(req.query.district)
    const propertyType = req.query.property;
    const publicOrPrivate = req.query.publicprivate;
    try {
        const filteredResults = await MainData.find({
            districtNumber: districtNumber,
            propertyType: propertyType,
            propertyPrivatePublic:publicOrPrivate ,
            statusBuyRent: "Buy",
            propertyPrice : {$exists: true}
        });
        if(filteredResults.length==0){
            return res.status(404).send('No data found for given criteria');
        }
        const totalPrice = filteredResults.reduce((acc,data)=>{
            return acc+data.propertyPrice;
        },0);
        const averagePrice  = totalPrice/filteredResults.length;

        // res.send('Estimated house price  : ${averagePrice}');
        res.send({averagePrice});
        // res.json(averagePrice);
    }catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    
};


exports.getPropertyTypeList = async(req, res, next)=>{
    const filePath = path.join(__dirname, '../_data/property_type.json');
        fs.readFile(filePath, (err, data)=>{
            if(err){
                console.error(err);
                res.status(500).send('error reding file') ;

            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);

            }
        });
    
};
