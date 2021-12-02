const mongoose = require("mongoose");
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

// Get connection to DB
mongoose.connect('mongodb://localhost/clientconfig')//'mongodb://localhost/clientconfig'
.then(() => console.log("connected to mongo"))
.catch((err) => console.log('mongo db connection faild',err));


  // IMPORT DATA INTO DB
const importData = async () => {
    try {
        const users =[{
           name:"Admin",
           email:"admin@agnext.in",
           password:"Config123!" 
        }]

        const salt = await bcrypt.genSalt(10);
        users[0].password = await bcrypt.hash(users[0].password,salt);

      await User.create(users, { validateBeforeSave: false });
      
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };


  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    //deleteData();
  }