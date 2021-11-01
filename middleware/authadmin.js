module.exports = function (req,res,next){
  
    try{
        
      if(!req.user.isAdmin){
          return res.send('Forbidden.').status(401);
      }
      next();
    }
    catch(err){
      return res.send('Invalid Token.').status(400);
    }
    
  }   