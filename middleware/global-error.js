const winston = require('winston');
module.exports = function(err,req,res,next){

  // const levels = { 
  //   error: 0,
  //   warn: 1,
  //   info: 2,
  //   http: 3,
  //   verbose: 4,
  //   debug: 5,
  //   silly: 6
  // };
   // winston.log('error',err.message);
    winston.error(err.message,err);
   // console.log({'errrrrrrrrr':err});
    res.status(500).send(err.message);
  }