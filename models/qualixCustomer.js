const mongose = require('mongoose');
const {addressSchema} = require('./addressSchema');
const {qualixUserSchema}= require('./qualixUserSchema')
const qualixCustomerSchema = new mongose.Schema({

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
    user:qualixUserSchema
})

const QualixCustomer = mongose.model('QualixCustomer',qualixCustomerSchema);
module.exports.QualixCustomer = QualixCustomer;