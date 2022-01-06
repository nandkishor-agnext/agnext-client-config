const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
    stateId:{type:Number,required:true},
    cityId:{type:Number,required:true},        
    name:{type:String,required:true}
});

const City = mongoose.model('City',citySchema);
exports.City = City;