// 以前为favicon 现在被替代成为server-favicon
var connect = require('connect');
var favicon = require('serve-favicon');
var path    = require('path');
// 过滤掉favicon的请求.
connect()
  .use(favicon(path.join(__dirname,'public','favicon.ico')))
  .use(function(req,res){
    console.log('%s %s',req.method,req.url);
    res.end('hello world');
  })
  .listen(3000);
