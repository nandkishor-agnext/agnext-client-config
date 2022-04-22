const http = require('http');
var axios = require("axios");
var FormData = require('form-data');
const { resolve } = require('path');
const agclienthelper= require('../agclients/agclienthelper');

async function createClient(clientId,agclientpostData,tokenexpire=false){  
  
  let tokenObject = await agclienthelper.getTokenObject(clientId,tokenexpire);
  
  return  await createagClientapicall(tokenObject,agclientpostData)  
  


}

async function createagClientapicall(tokenObject,postdata){
  
  return new Promise((resolve,reject)=>{
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+tokenObject.token
      }
     let weburl = "http://"+tokenObject.baseUrl; 
    //const api = axios.create({baseURL: 'https://aryadevback.qualixag.club'});
   const api = axios.create({baseURL: weburl});
    api.post('/api/customer', postdata,{
    headers: headers
  })
    .then(res => {   
     
      resolve(res)
    })
    .catch(error => {      
    //console.log({'errortestetstsetsetet':error})
    if(error.response && error.response.data){
      let errorObj = error.response.data;
      errorObj.statuscode=error.response.status;
      reject(errorObj);
    }
    else if(error.response){
     
      reject(error.response);
    }
    else{
     
     reject(error);
    }
    
    });
  });
}

module.exports.createClient = createClient;




// const formUrlEncoded = x =>
//    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
