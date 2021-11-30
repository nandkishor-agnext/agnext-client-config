const express = require('express');

const {Commodity} = require('../models/commodity');
const status = require('../constants/responseStatus');

const routers = express.Router();

routers.get('/', async (req,res,next) => {
    try{
        const commodities = await Commodity.find();
        req.responseObject = commodities;
        req.responseObjectCount = commodities.length;
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
        const commodity = await Commodity.findById(req.params.id);
        if(!commodity) return res.status(401).send('Commodity Not Found');
        req.responseObject = commodity;        
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

routers.post('/', async (req,res,next) =>{

    try{
        const commodity = new Commodity({
            categoryId:req.body.categoryId,
            categoryName:req.body.categoryName,
            name:req.body.name,
            isActive:true
        });

       const newCommodity = await commodity.save();
       req.responseObject = newCommodity;        
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 201;
        next();
    }
    catch(err){
        res.status(500).json({
            status: status.ERROR,            
            message:err.message
          });
    }
    
})

routers.put('/:id', async(req,res,next) =>{
    try{
    let commodity = await Commodity.findById(req.params.id);
    if(!commodity) return res.status(401).send('Commodity Not Found');
    commodity.categoryId = req.body.categoryId,
    commodity.categoryName = req.body.categoryName,
    commodity.name = req.body.name;
    commodity = await commodity.save();
    req.responseObject = commodity;        
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

routers.delete('/:id', async(req,res,next) =>{
    try{
        const commodity = await Commodity.findByIdAndDelete(req.params.id);
        if(!commodity) return res.status(401).send('Commodity Not Found');
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 204;
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

