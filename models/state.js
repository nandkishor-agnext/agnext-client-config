const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
    countryId:{type:Number,required:true},
    stateId:{type:Number,required:true},    
    name:{type:String,required:true}
});

const State = mongoose.model('State',stateSchema);
exports.State = State;