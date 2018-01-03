// 以前为logger 现在为morgan
// 代码1 start
// var connect = require('connect');
// var morgan  = require('morgan');
// connect().use(morgan(':method :url :status :res[content-length]')).listen(3000);
// 代码1 end

var connect = require('connect');
var morgan  = require('morgan');
var url     = require('url');
var fs      = require('fs');
// 自定义指令.
morgan.token('query-string',function(req,res){
  return url.parse(req.url).query;
})
// connect().use(morgan(':query-string')).listen(3000);
// 提示简单的请求.
// connect().use(morgan('dev')).listen(3000);
// 保存日志到文件
// var stream = fs.createWriteStream('路径');
// connect().use(morgan('combined',{'stream':stream,'format':':method :url'}));
