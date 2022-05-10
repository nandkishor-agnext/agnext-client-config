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
        if(customercom.length === 0) return res.status(404).send('Customer Commodities Not Found');
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
            customerDetails: req.body.customerDetails,
            userDetails: req.body.userDetails,
            mappedData: req.body.mappedData,            
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
        let customer = await CustomerCommodities.find({'customerDetails.customerId': req.params.id});

        if(!customer) return res.status(401).send('Customer Not Found');

        console.log('customer[0]', customer[0]);

        customer[0].customerDetails = req.body.customerDetails,
        customer[0].userDetails = req.body.userDetails,
        customer[0].mappedData = req.body.mappedData,   

        customer = await customer[0].save();
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