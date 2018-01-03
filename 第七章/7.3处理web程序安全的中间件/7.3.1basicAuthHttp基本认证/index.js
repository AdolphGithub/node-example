var connect = require('connect');
var basicAuth = require('basic-auth');

connect().use(function(req){
  console.dir(basicAuth(req)); // undefined
  }).listen(3000);
