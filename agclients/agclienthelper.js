const { AGClient } = require("../models/agclient");
const clientloginwebcall = require('../clientwebcalls/clientlogincall');

async function getToken(agclientId,tokenexpire=false){   
    let  agclient = await AGClient.findById(agclientId); 
    if(!agclient){
      throw { name: 'Error', message: 'Client Not Found in Our Records.' };
    }

    if(!agclient.clientdetail || tokenexpire){
      const clientInfo = await clientloginwebcall(agclient);
      agclient.clientdetail = JSON.stringify(clientInfo);
      agclient = await agclient.save();
      return clientInfo.access_token;
      }
      else{
      let tempclient = JSON.parse(agclient.clientdetail);
      return tempclient.access_token;
      }       
}


module.exports.getToken = getToken;
 