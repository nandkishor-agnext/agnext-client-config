const mongoose = require("mongoose");

const rejectReasonSchema = new mongoose.Schema({    
    reason:{type:String,required:true}
});

const rejectionReason = mongoose.model('RejectionReason',rejectReasonSchema);

exports.RejectionReason = rejectionReason;