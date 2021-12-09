const express = require('express');
const status = require('../constants/responseStatus');
const {Customer}= require('../models/customer');

const routes = express.Router();

routes.get('/',async(req,res,next)=>{

    try{
        const customers = await Customer.find();
        req.responseObject = customers;
        req.responseObjectCount = customers.length;
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
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(401).send('Customer Not Found');
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

routes.post('/', async (req,res,next) =>{

    try{
        let tempaddress = {
            lineone : 'lone',
            linetwo : 'ltwo',
            country : 'india',
            state   : 'punjab',
            district : "SAS Nagar",
            city    : 'mohali',        
            pincode : '160101'
        };
        console.log({'tempaddress':tempaddress});
        const customer = new Customer({
            name:req.body.name,
            email:req.body.email,   
            mobile:req.body.mobile,
            gst:req.body.gst,
            pan:req.body.pan,
            cin:req.body.cin,
            address: tempaddress,
            isActive:true
        });

       const newCustomer = await customer.save();
       req.responseObject = newCustomer;        
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
    let customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(401).send('Customer Not Found');

    customer.name=req.body.name;
    customer.email=req.body.email; 
    customer.mobile=req.body.mobile;
    customer.gst=req.body.gst;
    customer.pan=req.body.pan;
    customer.cin=req.body.cin;
   // customer.address= tempaddress;

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
        const customer = await Customer.findByIdAndDelete(req.params.id);
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