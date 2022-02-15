const express = require('express');

const {City} = require('../models/city');
const status = require('../constants/responseStatus');

const routers = express.Router();

routers.get('/', async (req,res,next) => {
    try{
       
        let stid = req.query.stateid;
        const cities = stid ? await City.find({stateId: stid}) : await City.find();
        req.responseObject = cities;
        req.responseObjectCount = cities.length;
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 200;   
        next();
    }
    catch(err){
        res.status(500).json({
            status: status.ERROR,            
            message:err.message
          });
    }
    
});

routers.get('/:id', async (req,res,next) => {
    try{
        const cities = await City.findById(req.params.id);
        if(!cities) return res.status(401).send('City Not Found');
        req.responseObject = cities;        
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 200;
        next();
    }
    catch(err){
        res.status(500).json({
            status: status.ERROR,            
            message:err.message
          });
    }
})

module.exports = routers;