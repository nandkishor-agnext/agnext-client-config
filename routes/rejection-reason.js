const express = require('express');
const { RejectionReason }= require('../models/rejectioin-reason');

const routers = express.Router();

routers.get('/', async(req,res) =>{
    try{
        const reasons = await RejectionReason.find();
        res.send(reasons);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.get('/:id', async(req,res) =>{
    try{
        const reason = await RejectionReason.findById(req.params.id);
        if(!reason) return res.status(401).send('Rejection Reason not found.');
        res.send(reason);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.post('/', async(req,res) => {

    try{
        let reason = new RejectionReason({            
            reason:req.body.reason
        });
    
        reason = await reason.save();
        res.send(reason);
    }
    catch(err){
        res.status(500).send(err.message);
    }  

});

routers.put('/:id', async(req,res)=>{
    try{

    let reason = await RejectionReason.findById(req.params.id);
    if(!reason) return res.status(401).send('Rejection Reason not found.');

    
    reason.reason=req.body.reason;

    reason = await reason.save();
    res.send(reason);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

routers.delete('/:id',async(req,res) =>{
    try{
        let reason = await RejectionReason.findByIdAndDelete(req.params.id);
        if(!reason) return res.status(401).send('Reason not found.');
        reason.save();
        res.send({status:true});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = routers;