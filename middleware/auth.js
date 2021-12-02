const jwt = require('jsonwebtoken');
const config= require('config');


module.exports = function (req,res,next){
  const  token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Auth Token Required.');
  try{
    req.jwtUser = jwt.verify(token,process.env.JWTSECKEY);  
    next();
  }
  catch(err){
    return res.send('Invalid Token.').status(400);
  }
  
}   