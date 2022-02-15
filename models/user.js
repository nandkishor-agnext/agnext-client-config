const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:255
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255
    },
    
    password:{
        type:String,
        minlength:3,
        maxlength:500
    },

    mobile:{
        type:String,
        minlength:10,
        maxlength:11
    },
    creationdate: { type: Date, default: Date.now },
    isactive:{
        type:Boolean,
        default:false
    }
})

userSchema.methods.getAuthToken = function(){
    return jwt.sign({_id:this._id, name:this.name}, process.env.JWTSECKEY, {expiresIn: '1d'});
}

//delete token

userSchema.statics.deleteToken=function(token,cb) {
    var user=this;

    user.updateOne({$unset : {token : 1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

const User = mongoose.model('User',userSchema);

module.exports.User = User;