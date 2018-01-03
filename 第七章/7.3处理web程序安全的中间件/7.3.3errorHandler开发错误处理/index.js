// logger 被替换成为 morgan
var connect = require('connect');
var morgan  = require('morgan');
var errorHandler = require('errorhandler');
var app = connect()
  .use(morgan('dev'))
  .use(function(req,res,next){
    setTimeout(function(){
      next(new Error('something borke!'));
    },500);
  })
  .use(errorHandler())
  .listen(3000);
