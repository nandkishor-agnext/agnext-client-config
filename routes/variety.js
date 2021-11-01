const express = require('express');
const { Variety }= require('../models/Variety');

const routers = express.Router();

routers.get('/', async(req,res) =>{
    try{
        const varieties = await Variety.find();
        res.send(varieties);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.get('/:id', async(req,res) =>{
    try{
        const variety = await Variety.findById(req.params.id);
        if(!variety) return res.status(401).send('Variety not found.');
        res.send(variety);
    }
    catch(err){
        res.status(500).send(err.message);
    }    
});

routers.post('/', async(req,res) => {

    try{
        let variety = new Variety({
            commodityId:req.body.commodityId,
            commodityName:req.body.commodityName,
            name:req.body.name
        });
    
        variety = await variety.save();
        res.send(variety);
    }
    catch(err){
        res.status(500).send(err.message);
    }  

});

routers.put('/:id', async(req,res)=>{
    try{

    let variety = await Variety.findById(req.params.id);
    if(!variety) return res.status(401).send('Variety not found.');

    variety.commodityId=req.body.commodityId;
    variety.commodityName=req.body.commodityName;
    variety.name=req.body.name;

    variety = await variety.save();
    res.send(variety);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

routers.delete('/:id',async(req,res) =>{
    try{
        let variety = await Variety.findByIdAndDelete(req.params.id);
        if(!variety) return res.status(401).send('Variety not found.');
        variety.save();
        res.send({status:true});
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = routers;