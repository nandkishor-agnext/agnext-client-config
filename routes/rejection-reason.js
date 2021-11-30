const express = require('express');
const { RejectionReason }= require('../models/rejectioin-reason');
const status = require('../constants/responseStatus');

const routers = express.Router();

routers.get('/', async(req,res,next) =>{
    try{
        const reasons = await RejectionReason.find();
        req.responseObject = reasons;
        req.responseObjectCount = reasons.length;
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
        const reason = await RejectionReason.findById(req.params.id);
        if(!reason) return res.status(401).send('Rejection Reason not found.');
        req.responseObject = reason;        
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
        let reason = new RejectionReason({            
            reason:req.body.reason
        });
    
        reason = await reason.save();
        req.responseObject = reason;        
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

    let reason = await RejectionReason.findById(req.params.id);
    if(!reason) return res.status(401).send('Rejection Reason not found.');
    
    reason.reason=req.body.reason;
    reason = await reason.save();
    
    req.responseObject = reason;        
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
        let reason = await RejectionReason.findByIdAndDelete(req.params.id);
        if(!reason) return res.status(401).send('Reason not found.');
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