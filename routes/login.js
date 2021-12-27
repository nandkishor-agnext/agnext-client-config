const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError= require('http-errors')

const route = express.Router();

route.get('/', async(req,res)=>{
    res.send('works');
})

route.post('/', async(req,res,next) =>{

    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return next(createError(400,'Email or Password is incorrect.'));        
        const isValid = await bcrypt.compare(req.body.password,user.password);
        if(!isValid){
            return next(createError(400,'Email or Password is incorrect.'));
        }
        //res.header('x-auth-header',).
        const token = user.getAuthToken();
        res.send({name:user.name,_id:user._id,token:token});
    }
    catch(err){
    //return res.status(500).send('Something went wrong.'+err.message);
    return next(createError(500,'We are unable to process your request right now.'+err.message));
    }

});

module.exports=route;