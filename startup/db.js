const mongoose = require('mongoose');
//mongodb://20.198.101.210:27017/clientconfig
mongoose.connect(process.env.MongoDB_CST)//'mongodb://localhost/clientconfig'
.then(() => console.log("connected to mongo"))
.catch((err) => console.log('mongo db connection faild',err));

var db = mongoose.connection;

module.exports = db;