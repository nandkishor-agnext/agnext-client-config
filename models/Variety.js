const mongoose = require("mongoose");

const varietySchema = new mongoose.Schema({
    commodityId:{type:String,required:true},
    commodityName:{type:String,required:true},
    name:{type:String,required:true}
});

const Variety = mongoose.model('Variety',varietySchema);

exports.Variety = Variety;