const express = require('express');
const {State} = require('../models/state');
const status = require('../constants/responseStatus');

const routers = express.Router();

routers.get('/', async (req,res,next) => {
    try{
       // console.log({'req':req});
        let ctid = req.query.countryid;        
        const states = ctid ? await State.find({countryId: ctid}) : await State.find();
        req.responseObject = states;
        req.responseObjectCount = states.length;
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



module.exports = routers;