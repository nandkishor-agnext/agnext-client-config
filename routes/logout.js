const express = require('express');
const {User} = require('../models/user');
const createError= require('http-errors')

const route = express.Router();

route.get('/',  async(req,res,next) =>{

    try{
        User.deleteToken(token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200);
        });
    }
    catch(err){
        return next(createError(500,'We are unable to process your request right now.'+err.message));
    }

});

module.exports=route;