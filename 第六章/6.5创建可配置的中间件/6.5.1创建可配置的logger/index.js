var connect = require('connect');
var logger  = require('./logger');

function hello(req,res){
  res.setHeader('Content-type','text/plain');
  res.end('Hello world');
}

connect().use(logger(':method :url')).listen(3000);
