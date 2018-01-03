// 以前为logger 现在为morgan
// 代码1 start
// var connect = require('connect');
// var morgan  = require('morgan');
// connect().use(morgan(':method :url :status :res[content-length]')).listen(3000);
// 代码1 end

var connect = require('connect');
var morgan  = require('morgan');
var url     = require('url');
morgan.token('query-string',function(req,res){
  return url.parse(req.url).query;
})
connect().use(morgan(':query-string')).listen(3000);
