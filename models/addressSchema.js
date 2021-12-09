const mongose = require('mongoose');

const addressSchema= new mongose.Schema({
    lineone:{
        type:String,
        minlength:2,
        maxlength:250
    },
    linetwo:{
        type:String,
        minlength:2,
        maxlength:250
    },
    country:{
        type:String,        
        maxlength:250
    },
    state:{
        type:String,        
        maxlength:250
    },
    district:{
        type:String,        
        maxlength:250
    },
    city:{
        type:String,        
        maxlength:250
    },
    pincode:{
        type:String,        
        maxlength:250
    },

});

module.exports.addressSchema = addressSchema;