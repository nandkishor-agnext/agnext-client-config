const express = require('express');
const {CommodityCategory} = require('../models/commodity-category');
const status = require('../constants/responseStatus');


const routers = express.Router();

routers.get('/', async (req,res,next) => {
    try{
        const categories = await CommodityCategory.find();        
        req.responseObject = categories;
        req.responseObjectCount = categories.length;
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
        const category = await CommodityCategory.findById(req.params.id);
        if(!category) return res.status(401).send('Category Not Found');
        req.responseObject = category;        
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
        const category = new CommodityCategory({
            name:req.body.name,
            isActive:true//req.body.isActive
        });

       const newCategory = await category.save();
       req.responseObject = newCategory;        
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

routers.put('/:id',async(req,res,next)=>{
    try{
        let category = await CommodityCategory.findById(req.params.id);
        if(!category) return res.status(404).send('Commodity Category Not Found');
        category.name = req.body.name;
        category = await category.save();
        req.responseObject = category;        
        req.responseStatus = status.SUCCESS;
        req.responseStatusCode = 200;
        next();
    }catch(err){
        res.status(500).json({
            status: status.ERROR,            
            message:err.message
          });
    }    
});

routers.delete('/:id',async(req,res,next) =>{

    try{
        let category = await CommodityCategory.findByIdAndDelete(req.params.id);
        if(!category) return res.status(404).send('Commodity Category Not Found');
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

