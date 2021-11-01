const { string, boolean } = require('joi');
const mongoose= require('mongoose');


const Commodity = mongoose.model('Commodity',new mongoose.Schema({
    categoryId:{type:String,required:true},
    categoryName:{type:String,required:true},
    name:{type:String,required:true},
    isActive:{type:Boolean,default:true}
}))

exports.Commodity = Commodity;
