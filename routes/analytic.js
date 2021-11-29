const express = require("express");
const { Analytic } = require("../models/analytic");

const routers = express.Router();

routers.get('/', async(req,res) =>{
    try{
        const analytics = await Analytic.find();
        res.send(analytics);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.get('/:id', async(req,res) =>{
    try{
        const analytic = await Analytic.findOne({ _id: req.params.id});
        if(!analytic) return res.status(401).send('Data not found.');
        res.send(analytic);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.post('/', async(req,res) => {

    try{
        let analytic = new Analytic({            
            name:req.body.name,
            unit:req.body.unit,
            toleranceLimit:req.body.toleranceLimit
        });
    
        analytic = await analytic.save();
        res.send(analytic);
    }
    catch(err){
        res.status(500).send(err.message);
    }  

});

routers.put('/:id', async(req,res)=>{
    try{

    let analytic = await Analytic.findById(req.params.id);
    if(!analytic) return res.status(401).send('Data not found.');

    
    analytic.name=req.body.name;
    analytic.unit=req.body.unit;
    analytic.toleranceLimit=req.body.toleranceLimit;

    analytic = await analytic.save();
    res.send(analytic);

    }
    catch(err){
        res.status(500).send(err.message);
    }
});

routers.delete('/:id',async(req,res) =>{
    try{
        let analytic = await Analytic.findByIdAndDelete(req.params.id);
        if(!analytic) return res.status(401).send('Data not found.');
        analytic.save();
        res.send({status:true});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = routers;