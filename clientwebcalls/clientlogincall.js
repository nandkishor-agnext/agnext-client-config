const http = require('http');
var axios = require("axios");
var FormData = require('form-data');
const { resolve } = require('path');

//getCookie();
module.exports = async function GetClientAccessToken(loginInfo){
    
  //return new Promise((resolve,reject) => {
  
      //Step One
    const tempjCookie = await getCookie(loginInfo);
    //console.log({'tempjCookie':tempjCookie});
      //Step Tow
    const postLoginjCookie = await doLogin(loginInfo,tempjCookie);
    //console.log({'postLoginjCookie':postLoginjCookie});
    // this code is mostly replicated can be replaced with getCookie function
    const code = await getTokenCodebyCookie(loginInfo,postLoginjCookie);
    //console.log({'code':code});
      //Last step to obtain User Information
    return  await getaccessTokenbyCode(loginInfo,code,postLoginjCookie);

   // resolve(accessToken);
    
  //});
    
}




async function getCookie(loginInfo){
 return new Promise((resolve,reject)=>{

 
//let baseurl = 'http://teadev.qualixag.club/tea/oauth/authorize?client_id=clientId&response_type=code';
let optionsget = {
  host : loginInfo.urlhost, 
  path : loginInfo.loginurlpathname,//'/tea/oauth/authorize?client_id=clientId&response_type=code', // the rest of the url with parameters if needed
  method : 'GET'
};


if(loginInfo.urlport){
  optionsget.port=loginInfo.urlport;
}



//do the GET request
var reqGet = http.request(optionsget, function(res) { 
    let statuscode = res.statusCode;
    // console.log({'statuscode':statuscode});
    // console.log({'resgetCookiegetCookiegetCookiegetCookie':res.headers})
    if(statuscode != 302){
        throw { name: 'Error', message: 'Step One Not able to obtain access cookies('+statuscode+')' };
    }
    
  let cookies = res.headers['set-cookie']; 
  if(cookies && cookies.length > 0){
    let val = cookies[0].split(';');   
    if(val.length > 0){
      let jcookie = val[0];      
      resolve(jcookie);
     // doLogin(loginInfo,jcookie);
    }
  }
  else{
    throw { name: 'Error', message: 'Step One Not able to obtain access cookies(set-cookie header not found)' };
  }

  // res.on('data', function(d) {  
  //     process.stdout.write(d);  
  // });

});

reqGet.end();
reqGet.on('error', function(e) {
  //console.error('Error while getting cookie information'+e);
 throw { name: 'Error', message: 'Step One Error while getting cookie information('+e+')' };
});

});

}


async function doLogin(loginInfo,cookie){

  return new Promise((resolve,reject)=>{

  
  // create Post object and encode it
  let jsonObject = {username:loginInfo.username,password:loginInfo.userpass}//{username:'aideobarie.sa@agnext.in',password:'ad-sa'};
  let encodeddata = formUrlEncoded(jsonObject);

var postheaders = {
  'Content-Type' :'application/x-www-form-urlencoded',
  'Content-Length' : Buffer.byteLength(encodeddata, 'utf8'),
  'Cookie' : cookie,
};

// the post options
var optionspost = {
  host : loginInfo.urlhost,
 // port : 443,
  path : loginInfo.loginurlsubpart,
  method : 'POST',
  headers : postheaders
};

if(loginInfo.urlport){
  optionspost.port=loginInfo.urlport;
}

// do the POST call
var reqPost = http.request(optionspost, function(res) { 
 // console.log({'step two headers':res.headers});
 // console.log({'step two response':res});
  let cookies = res.headers['set-cookie']; 
  if(cookies && cookies.length > 0){
    let val = cookies[0].split(';');   
    if(val.length > 0){
      let postlogincookie = val[0];
      //console.log({'postlogincookie':postlogincookie});
      resolve(postlogincookie)
      //getTokenbyCookie(loginInfo,postlogincookie);
    }
  }
  else{
    throw { name: 'Error', message: 'Step Two Not able to obtain access cookies(set-cookie header not found)' };
  }

//   res.on('data', function(d) {
//       console.info('POST result:\n');
//       process.stdout.write(d);
//       console.info('\n\nPOST completed');
//   });
});

// write the json data
reqPost.write(encodeddata);
reqPost.end();
reqPost.on('error', function(e) {
  console.error(e);
});

});

}



 async function  getTokenCodebyCookie(loginInfo,cookie){
   return new Promise((resolve,reject)=>{

let baseurl = 'http://teadev.qualixag.club/tea/oauth/authorize?client_id=clientId&response_type=code';
var optionsget = {
  host : loginInfo.urlhost, // here only the domain name
  // (no http/https !)
  //port : 443,
  path : loginInfo.loginurlpathname,//'/tea/oauth/authorize?client_id=clientId&response_type=code', // the rest of the url with parameters if needed
  method : 'GET', // do GET,
  headers:{ 
    'Cookie' : cookie
  }
};


if(loginInfo.urlport){
  optionsget.port=loginInfo.urlport;
}

// do the GET request
var reqGet = http.request(optionsget, function(res) {  
 // console.log({'res.headers.location':res.headers.location});
  if(res && res.headers && res.headers.location){
    let code = res.headers.location.split("=")[1]; 
    resolve(code);
  }
  else{
    throw { name: 'Error', message: 'Location not found, unable to get code param from url.' };
  } 
 
//   res.on('data', function(d) {
//       console.info('GET result:\n');
//       process.stdout.write(d);
//       console.info('\n\nCall completed');
//   });
});

reqGet.end();
reqGet.on('error', function(e) {
  console.error(e);
});

});

}

async function getaccessTokenbyCode(loginInfo,code,cookie){
    return new Promise((resolve,reject) =>{
            //let base_url = "http://teadev.qualixag.club/tea/arya/token?code="+code+"&bearer=clientId" 
            var optionsget = {
                host : loginInfo.urlhost, // here only the domain name
                // (no http/https !)
                //port : 443,
                path :loginInfo.loginurltokenpart.replace('{}',code),// '/tea/arya/token?code='+code+'&bearer=clientId', // the rest of the url with parameters if needed
                method : 'GET', // do GET,
                headers:{ 
                'Cookie' : cookie
                }
            };  

            if(loginInfo.urlport){
              optionsget.port=loginInfo.urlport;
            }
            
            // do the GET request
            var reqGet = http.request(optionsget, function(res) {  
            //https://stackoverflow.com/questions/19539391/how-to-get-data-out-of-a-node-js-http-get-request
            var body = [];
                res.on('data', function(chunk) {
                body.push(chunk); 
                }).on('end',(e)=>{
                body = JSON.parse(Buffer.concat(body).toString());
                resolve(body);
                });  
            });
            
            reqGet.end();
            reqGet.on('error', function(e) {
                console.error(e);
            });
    })
 
}

const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
