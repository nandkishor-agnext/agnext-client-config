const express = require("express");
const { Analytic } = require("../models/analytic");
const status = require('../constants/responseStatus');


const routers = express.Router();

routers.get('/', async(req,res,next) =>{
    try{
        const analytics = await Analytic.find();

        req.responseObject = analytics;
        req.responseObjectCount = analytics.length;
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
        const analytic = await Analytic.findOne({ _id: req.params.id});
        if(!analytic) return res.status(401).send('Data not found.');
        
        req.responseObject = analytic;        
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
        let analytic = new Analytic({            
            name:req.body.name,
            unit:req.body.unit,
            toleranceLimit:req.body.toleranceLimit
        });
    
        analytic = await analytic.save();
        req.responseObject = analytic;        
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

    let analytic = await Analytic.findById(req.params.id);
    if(!analytic) return res.status(401).send('Data not found.');

    
    analytic.name=req.body.name;
    analytic.unit=req.body.unit;
    analytic.toleranceLimit=req.body.toleranceLimit;

    analytic = await analytic.save();
    req.responseObject = analytic;        
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

routers.delete('/:id',async(req,res,next) =>{
    try{
        let analytic = await Analytic.findByIdAndDelete(req.params.id);
        if(!analytic) return res.status(401).send('Data not found.');
       
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
});

module.exports = routers;