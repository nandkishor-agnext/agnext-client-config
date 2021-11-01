const express = require('express');

const {Commodity} = require('../models/commodity');

const routers = express.Router();

routers.get('/', async (req,res) => {
    try{
        const commodities = await Commodity.find();
        res.send(commodities);
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
});

routers.get('/:id', async (req,res) => {
    try{
        const category = await Commodity.findById(req.params.id);
        if(!category) return res.status(401).send('Commodity Not Found');
        res.send(category);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

routers.post('/', async (req,res) =>{

    try{
        const commodity = new Commodity({
            categoryId:req.body.categoryId,
            categoryName:req.body.categoryName,
            name:req.body.name,
            isActive:true
        });

       const newCommodity = await commodity.save();
       res.send(newCommodity);
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
})

routers.put('/:id', async(req,res) =>{
    try{
    let commodity = await Commodity.findById(req.params.id);
    if(!commodity) return res.status(401).send('Commodity Not Found');
    commodity.categoryId = req.body.categoryId,
    commodity.categoryName = req.body.categoryName,
    commodity.name = req.body.name;
    commodity = await commodity.save();
    res.send(commodity);
    }
    catch(err){
        
        res.status(500).send(err.message);
    }
});

routers.delete('/:id', async(req,res) =>{
    try{
        const commodity = await Commodity.findByIdAndDelete(req.params.id);
        if(!commodity) return res.status(401).send('Commodity Not Found');
        commodity.save();
        res.send({status:true});
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
})

module.exports = routers;

