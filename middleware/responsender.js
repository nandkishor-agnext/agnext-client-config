module.exports = function(req, res, next) {
    const message = {};
    if(req.responseObject){
      message.data = req.responseObject;
    }
    if(req.responseObjectCount){
      message.count = req.responseObjectCount;
    }
    if(req.responseStatus){
      message.status = req.responseStatus;
    }
    //message.success = true;
    //message.status = req.responseStatus || 200;
   // message.status =
    res.status(req.responseStatusCode || 200).send(message);
    //return next();
  };