const mongoose = require('mongoose');
const {addressSchema} = require('./addressSchema');
const qualixUserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        minlength:3,
        maxlength:255
    },
    last_name:{
        type:String,
        minlength:3,
        maxlength:255
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255
    }, 
    contact_number:{
        type:String,
        minlength:10,
        maxlength:11
    },
    roles:[],
    user_hierarchy:{type:String},
    is_2fa_required:{type:Number},       
    address:[addressSchema], 
    creationdate: { type: Date, default: Date.now },
    isactive:{
        type:Boolean,
        default:false
    }
});

module.exports.qualixUserSchema = qualixUserSchema;