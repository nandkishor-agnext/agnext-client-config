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
    }
})

userSchema.methods.getAuthToken = function(){
    return jwt.sign({_id:this._id,name:this.name},process.env.JWTSECKEY);
}

const User = mongoose.model('User',userSchema);

module.exports.User = User;