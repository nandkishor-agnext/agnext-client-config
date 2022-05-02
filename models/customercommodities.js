const { string, boolean } = require('joi');
const mongoose= require('mongoose');

const analysisSchema =  new mongoose.Schema({
    analysisId:{type:String,required:true},
    analysisName:{type:String,required:true},
    unit:{type:String,required:true},
    toleranceLimit:{type:Number,required:true}
});
const varietySchema =  new mongoose.Schema({ 
    varietyId:{type:String,required:true},
    varietyName:{type:String,required:true},
    analysis:[analysisSchema]
});
const commoditySchema =  new mongoose.Schema({
    commodityId:{type:String,required:true},
    commodityName: {type:String,required:true},
    varieties:[varietySchema]
});
const categorySchema = new mongoose.Schema({
    categoryId:{type:String,required:true},
    categoryName:{type:String,required:true},
    commodities:[commoditySchema]
})

const CustomerCommodities = mongoose.model('CustomerCommodity',new mongoose.Schema({
    customerDetails: {
        customerId: {
            type:String,
            required:true
        },
        customerName: {
            type:String,
            required:true
        }
    },
    userDetails: {
        userId: {
            type:String,
            required:true
        },
        userName: {
            type:String,
            required:true
        }
    },
    mappedData:[categorySchema],
    isActive: {
        type:Boolean,
        default:true
    }
}))

exports.CustomerCommodities = CustomerCommodities;
