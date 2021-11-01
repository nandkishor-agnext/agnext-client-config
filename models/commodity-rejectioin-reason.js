const mongoose = require("mongoose");

const rejectReasonSchema = new mongoose.Schema({
    commodityId:{type:String,required:true},
    commodityName:{type:String,required:true},
    name:{type:String,required:true}
});

const CommodityRejectionReason = mongoose.model('CommodityRejectionReason',rejectReasonSchema);

exports.CommodityRejectionReason = CommodityRejectionReason;