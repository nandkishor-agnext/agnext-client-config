const mongose = require('mongoose');
const {addressSchema} = require('./addressSchema');
const customerSchema = new mongose.Schema({

    name:{
        type:String,
        minlength:3,
        maxlength:255
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255
    },
    
    mobile:{
        type:String,
        minlength:10,
        maxlength:10
    },
    gst:{
        type:String,
        minlength:15,
        maxlength:50
    },
    pan:{
        type:String,
        minlength:10,
        maxlength:10
    },
    cin:{
        type:String,
        minlength:10,
        maxlength:30
    },
    address:[addressSchema]
})

const Customer = mongose.model('Customer',customerSchema);
module.exports.Customer = Customer;