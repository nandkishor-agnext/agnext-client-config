const { string, boolean } = require('joi');
const mongoose= require('mongoose');


const CommodityCategory = mongoose.model('CommodityCategory',new mongoose.Schema({
    name:{
        type:String,
        required:true},
    isActive:{
        type:Boolean,
        default:true}
}))

exports.CommodityCategory = CommodityCategory;
