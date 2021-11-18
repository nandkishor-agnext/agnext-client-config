require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function(){
    // process.on('uncaughtException',(ex)=>{
//     //console.log('Exception we got');
//     winston.error(ex.message,ex);
//     process.exit(1);
// });

winston.exceptions.handle(
    new winston.transports.Console({colorize:true,prettyPrint:true}),
    new winston.transports.File({filename:"unhandledexception.log"})
);

process.on('unhandledRejection',(ex) => {
    //console.log('Rejection we got'); 
    // winston.error(ex.message,ex);
    // process.exit(1);
    throw(ex);

});

winston.add(new winston.transports.File({ filename:'logfile.log'}));
// winston.add(new winston.transports.MongoDB({db:process.env.MongoDB_CST, useUnifiedTopology: true}));
}