const mongoose = require('mongoose');

mongoose.connect(process.env.MongoDB_CST)//'mongodb://localhost/clientconfig'
.then(() => console.log("connected to mongo"))
.catch((err) => console.log('mongo db connection faild',err));

var db = mongoose.connection;

module.exports = db;