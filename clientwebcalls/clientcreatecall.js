const http = require('http');
var axios = require("axios");
var FormData = require('form-data');
const { resolve } = require('path');
const agclienthelper= require('../agclients/agclienthelper');

async function createClient(clientId,agclientpostData,tokenexpire=false){   
  let token = await agclienthelper.getToken(clientId,tokenexpire);
  return  await createagClientapicall(token,agclientpostData)  
  //.then(res => {
    //return res;
  //}).
  // catch(errorres=>{
  //   throw errorres;
  // });


}

async function createagClientapicall(token,postdata){

  return new Promise((resolve,reject)=>{
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }

    const api = axios.create({baseURL: 'http://aryadevback.qualixag.club'});
    api.post('/api/customer', postdata,{
    headers: headers
  })
    .then(res => {   
      console.log('then createagClientapicall');   
      resolve(res)
    })
    .catch(error => {      
      console.log('catch createagClientapicall');       
      reject({statuscode:error.response.status,error:error.response.data});      
    });
  });
}

module.exports.createClient = createClient;




// const formUrlEncoded = x =>
//    Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
