const express = require('express');
const { Variety }= require('../models/Variety');
const status = require('../constants/responseStatus');

const routers = express.Router();

routers.get('/', async(req,res,next) =>{
    try{
        const varieties = await Variety.find();
        req.responseObject = varieties;
        req.responseObjectCount = varieties.length;
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

routers.get('/:id', async(req,res,next) =>{
    try{
        const variety = await Variety.findById(req.params.id);
        if(!variety) return res.status(401).send('Variety not found.');
        req.responseObject = variety;        
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

routers.post('/', async(req,res,next) => {

    try{
        let variety = new Variety({
            commodityId:req.body.commodityId,
            commodityName:req.body.commodityName,
            name:req.body.name
        });
    
        variety = await variety.save();
        req.responseObject = variety;        
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

});

routers.put('/:id', async(req,res,next)=>{
    try{

    let variety = await Variety.findById(req.params.id);
    if(!variety) return res.status(401).send('Variety not found.');

    variety.commodityId=req.body.commodityId;
    variety.commodityName=req.body.commodityName;
    variety.name=req.body.name;

    variety = await variety.save();
    req.responseObject = variety;        
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

routers.delete('/:id',async(req,res,next) =>{
    try{
        let variety = await Variety.findByIdAndDelete(req.params.id);
        if(!variety) return res.status(401).send('Variety not found.');
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