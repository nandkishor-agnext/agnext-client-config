// const http = require('http')

// /**
//  * HOW TO Make an HTTP Call - POST
//  */
// // do a POST request
// // create the JSON object
// jsonObject = JSON.stringify({email: "operations@agnext.in", password: "Labx123!"});

// // prepare the header
// var postheaders = {
//     'Content-Type' : 'application/json',
//     'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
// };

// // the post options
// var optionspost = {
//     host : 'mytestlab.qualixag.club',
//     port : 9966,
//     path : '/auth/login',
//     method : 'POST',
//     headers : postheaders
// };

// console.info('Options prepared:');
// console.info(optionspost);
// console.info('Do the POST call');

// // do the POST call
// var reqPost = https.request(optionspost, function(res) {
//     console.log("statusCode: ", res.statusCode);
//     // uncomment it for header details
// //  console.log("headers: ", res.headers);

//     res.on('data', function(d) {
//         console.info('POST result:\n');
//         process.stdout.write(d);
//         console.info('\n\nPOST completed');
//     });
// });

// // write the json data
// reqPost.write(jsonObject);
// reqPost.end();
// reqPost.on('error', function(e) {
//     console.error(e);
// });
