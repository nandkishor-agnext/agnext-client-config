const mongoose= require('mongoose');

const agclientschema = new mongoose.Schema({
        name:{type:String,required:true,minlength:2,maxlength:250},
        username:{type:String,required:true},
        userpass:{type:String,required:true},
        urlhost:{type:String,required:true,maxlength:300}, 
        urlport:{type:String,maxlength:20},   
        loginurlpathname:{type:String,required:true,maxlength:1000}, 
        loginurlsubpart:{type:String,required:true,maxlength:1000}, 
        loginurltokenpart:{type:String,required:true,maxlength:1000},            
        clientdetail:{type:String},
        clientdetaildate:{ type: Date},
        isActive:{type:Boolean}
});

const agclient = mongoose.model('AGClient',agclientschema)
exports.AGClient = agclient;