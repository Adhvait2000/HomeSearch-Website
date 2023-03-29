const MainData = require('../models/MainData');
const TownStats = require('../models/TownStats');
const fs = require('fs');
exports.getPrices = async(req, res, next)=>{
    const query = req.query;
    
    
};

exports.getPriceEstimatorHome= async(req, res,next)=>{
    try {
        const townsList = await TownStats.find({});
        const 
    }catch{
        

    }
};

exports.getPropertyTypeList = async(req, res, next)=>{
     
        fs.readFile('../_data/property_type.json', (err, data)=>{
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


