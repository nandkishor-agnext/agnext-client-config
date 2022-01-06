require('dotenv').config();
const mongoose = require("mongoose");
const {User} = require('../models/user');
const {Country} = require('../models/country');
const {State} = require('../models/state');
const {City} = require('../models/city');
const statesandcities = require('../startup/data/stateandcity');
const bcrypt = require('bcrypt');


mongoose.connect(process.env.MongoDB_CST)//'mongodb://localhost/clientconfig'
.then(() => console.log("connected to mongo"))
.catch((err) => console.log('mongo db connection faild',err));

  // IMPORT DATA INTO DB
const importUserData = async () => {
    try {
        const users =[{
           name:"Admin",
           email:"admin@agnext.in",
           password:"Config123!",
           mobile:"7986233369"
        }]

        const salt = await bcrypt.genSalt(10);
        users[0].password = await bcrypt.hash(users[0].password,salt);

      await User.create(users, { validateBeforeSave: false });
      
      console.log('User Data successfully loaded!');
    } catch (err) {
      console.log('User Date Failed to load!'+err)      
    }
    process.exit();
  };

  const importCountryData = async () => {
    try {
        const country =[{
          countryId:101,
           name:"India"          
        }]       

      await Country.create(country, { validateBeforeSave: false });
      
      console.log('Country Data successfully loaded!');
    } catch (err) {
      console.log('Country Fail to load!'+err);      
    }
    process.exit();
  };

  const importStateData = async () => {
    try {

      let states = getStates();
      await State.create(states, { validateBeforeSave: false });
   // await State.deleteMany();
      console.log('State Data successfully loaded!');
    } catch (err) {
      console.log('State Date Fail to load!'+err);      
    }
    process.exit();
  };

  const importCityData = async () => {
    try {

      let cities = getCities();
      //console.log({'cities':cities});
      await City.create(cities, { validateBeforeSave: false });
      console.log('City Data successfully loaded!');

    } catch (err) {
      console.log('City Date Fail to load!'+err);      
    }
    process.exit();
  };


  if (process.argv[2] === '--importuser') {
    importUserData();
  } 
  else if (process.argv[2] === '--importcountry') {
    importCountryData();
  }
  else if (process.argv[2] === '--importstate') {
    importStateData();
  }
  else if (process.argv[2] === '--importcity') {
    importCityData();
  }
  else if (process.argv[2] === '--delete') {
    //deleteData();
  }


  function getStates(){
    let states = [];    
    statesandcities.forEach( state => {
      states.push({ countryId:101,stateId:state.state_id,name:state.state_name});
    });
    return states;
  }


  function getCities(){
    let cities = [];    
    statesandcities.forEach( state => {
      state.cities.forEach(city => {
        cities.push({stateId:state.state_id,name:city.city_name,cityId:city.city_id});    
      });
    });
    return cities;
  }