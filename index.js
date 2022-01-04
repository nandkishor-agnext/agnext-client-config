//Load enviourment variable
require('dotenv').config();

//Make database connection
require('./startup/db');


const express = require('express');
var cors = require('cors')
//const config = require('config');
const corsOpts = {
    origin: '*',
  
    // methods: [
    //   'GET',
    //   'POST',
    // ],
  
    // allowedHeaders: [
    //   'Content-Type',
    // ],
  };
  
  
//


//If enviornment variable not found
if(!process.env.JWTSECKEY){
    console.log('Fatal Error:JWT Private Key not defined');
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors(corsOpts));

//All the Router are here
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/prod')(app);
const http = require('http');
var axios = require("axios");
var FormData = require('form-data');
const { Console } = require('console');

//Route Not Found
app.use((req,res) =>{
    res.status(404).send('Resource not found');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    //res.locals.error = req.app.get("env") === "development" ? err : {};
    res.locals.error =  err;
  
    // render the error page
    res.status(err.status || 5000);
    res.json({ error: err });
  });

const port = process.env.PORT || 9001;
app.listen(port,() => console.log(`listing at ${port}`));
