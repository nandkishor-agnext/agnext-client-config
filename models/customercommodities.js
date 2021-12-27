const { string, boolean } = require('joi');
const mongoose= require('mongoose');

const varietySchema =  new mongoose.Schema({ varietyid:'string', name: 'string' });
const commoditySchema =  new mongoose.Schema({ categoryid:'string',categoryname:'string', commodityid:'string', name: 'string',varieties:[varietySchema] });

const CustomerCommodities = mongoose.model('CustomerCommodity',new mongoose.Schema({
    customerId:{
        type:String,
        required:true},
    customerName:{
        type:String,
        required:true},
    commodities:[commoditySchema],
    isActive:{
        type:Boolean,
        default:true}
}))

exports.CustomerCommodities = CustomerCommodities;
