const express = require('express');
const status = require('../constants/responseStatus');
const {CustomerCommodities}= require('../models/customercommodities');

const routes = express.Router();

routes.get('/',async(req,res,next)=>{

    try{
        const customerscommodities = await CustomerCommodities.find();
        req.responseObject = customerscommodities;
        req.responseObjectCount = customerscommodities.length;
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

routes.get('/:id',async(req,res,next) =>{

    try{
        const customercom = await CustomerCommodities.find({'customerDetails.customerId': req.params.id});
        if(!customercom) return res.status(404).send('Customer Commodities Not Found');
        req.responseObject = customercom;        
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

routes.post('/', async (req,res,next) =>{

    try{       
        
        const customer = new CustomerCommodities({
            customerId:req.body.customerId,
            customerName:req.body.customerName,

            commodities:req.body.commodity_mapped,            
            isActive:true
        });        

       const newCustomercom = await customer.save();
       req.responseObject = newCustomercom;        
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

routes.put('/:id', async(req,res,next) =>{
    try{
    let customer = await CustomerCommodities.findById(req.params.id);
    if(!customer) return res.status(401).send('Customer Not Found');

    customer.name=req.body.name;
    customer.email=req.body.email; 
    customer.mobile=req.body.mobile;
    customer.gst=req.body.gst;
    customer.pan=req.body.pan;
    customer.cin=req.body.cin;
   //customer.address= tempaddress;

    customer = await customer.save();
    req.responseObject = customer;        
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

routes.delete('/:id',async(req,res,next) =>{
    try{
        const customer = await CustomerCommodities.findByIdAndDelete(req.params.id);
        if(!customer) return res.status(401).send('Customer Not Found');
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



module.exports=routes;