const mongose = require('mongoose');

const addressSchema= new mongose.Schema({
    address1:{
        type:String,
        minlength:2,
        maxlength:2000,
        required:true
    },    
    country:{
        type:Number,        
        required:true
    },
    state:{
        type:Number,        
        required:true
    },    
    city:{
        type:Number,        
        required:true
    },
    pincode:{
        type:String,        
        maxlength:6,
        required:true
    },

});

module.exports.addressSchema = addressSchema;