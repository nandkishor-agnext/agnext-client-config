const mongoose = require("mongoose");

const analyticSchema = new mongoose.Schema({
    name:{type:String,required:true},
    unit:{type:String,required:true},
    toleranceLimit:{
        type:Number,required:true
    }
});

const analytic = mongoose.model('Analytic',analyticSchema)
exports.Analytic = analytic;