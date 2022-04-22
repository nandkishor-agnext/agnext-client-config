const { AGClient } = require("../models/agclient");
const clientloginwebcall = require('../clientwebcalls/clientlogincall');

async function getTokenObject(agclientId,tokenexpire=false){   
  
    let  agclient = await AGClient.findById(agclientId); 
    if(!agclient){
      throw { name: 'Error', message: 'Client Not Found in Our Records.' };
    }    

    if(!agclient.clientdetail || tokenexpire){
      const clientInfo = await clientloginwebcall(agclient);      
      agclient.clientdetail = JSON.stringify(clientInfo);
      agclient = await agclient.save();
      return {token : clientInfo.access_token,baseUrl:agclient.urlhost};
      }
      else{
      let tempclient = JSON.parse(agclient.clientdetail);      
      return {token:tempclient.access_token,baseUrl:agclient.urlhost};
      }       
}


module.exports.getTokenObject = getTokenObject;
 