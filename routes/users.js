const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const route = express.Router();


route.post('/', async(req,res) =>{

    try{    
        const olduser = await User.findOne({email:req.body.email});
        if(olduser) return res.status(400).send('User already exists.');

        let user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        user = await user.save();
        //const token = user.getAuthToken();
        res.send({name:user.name,_id:user._id});
        
    }
    catch(err){
    return res.status(500).send('Something went wrong. '+err.message);
    }

})

// route.post('/', async(req,res) =>{

//     try{    
//         const user = await User.findById(req.body.email);
//         if(!user) return res.status(400).send('Email or Password is incorrect.');

//         const isValid = await bcrypt.compare(user.password,req.body.password);
//         if(!isValid){
//             return res.status(400).send('Email or Password is incorrect.');
//         }

//         res.header('x-auth-header',user.getAuthToken()).send({name:user.name,_id:user._id});
//     }
//     catch(err){
//     return res.status(500).send('Something went wrong.');
//     }

// })

module.exports=route;