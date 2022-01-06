const mongoose = require('mongoose');
const countrySchema = new mongoose.Schema({
    countryId:{type:Number,required:true},    
    name:{type:String,required:true}
});

const Country = mongoose.model('Country',countrySchema);

exports.Country = Country;