const express = require('express');
const {CommodityCategory} = require('../models/commodity-category');


const routers = express.Router();

routers.get('/', async (req,res) => {
    try{
        const categories = await CommodityCategory.find();        
        res.send(categories);
    }
    catch(err){
        res.status(500).send(err.message);
    }  
    
});

routers.get('/:id', async (req,res) => {
    try{
        const category = await CommodityCategory.findById(req.params.id);
        if(!category) return res.status(401).send('Category Not Found');
        res.send(category);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

routers.post('/', async (req,res) =>{

    try{
        const category = new CommodityCategory({
            name:req.body.name,
            isActive:true//req.body.isActive
        });

       const newCategory = await category.save();
       res.send(newCategory);
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
})

routers.put('/:id',async(req,res)=>{
    try{
        let category = await CommodityCategory.findById(req.params.id);
        if(!category) return res.status(404).send('Commodity Category Not Found');
        category.name = req.body.name;
        category = await category.save();
        res.send(category);
    }catch(err){
        res.status(500).send(err.message);
    }    
});

routers.delete('/:id',async(req,res) =>{

    try{
        let category = await CommodityCategory.findByIdAndDelete(req.params.id);
        if(!category) return res.status(404).send('Commodity Category Not Found');
        category.save();
        res.send({status:true});
    }
    catch(err){
        res.status(500).send(err.message);
    }
    

})



module.exports = routers;

