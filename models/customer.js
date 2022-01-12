const mongose = require('mongoose');
const {addressSchema} = require('./addressSchema');
const customerSchema = new mongose.Schema({

    name:{
        type:String,
        minlength:3,
        maxlength:255,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true
    },
    contact_number:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true
    },
    gst:{
        type:String,
        minlength:15,
        maxlength:50,
        required:true
    },
    pan:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true
    },
    commodity_category_ids:[Number],
    address:[addressSchema],
    user:{}
})

const Customer = mongose.model('Customer',customerSchema);
module.exports.Customer = Customer;