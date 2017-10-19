const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data ={ id:'i am danny'};

var token = jwt.sign(data, '1234567890');
console.log(token);

//jwt.verify(data)
//var hash = SHA256(message).toString();

// console.log(`Mesage: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//     if(resultHash === token.hash) {
//         console.log('Data # OK');
//     }else {
//         console.log('Data compromised');
//     }