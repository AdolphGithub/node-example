var connect = require('connect');
function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}

function hello(req,res){
  res.setHeader('Content-type','text/plain');
  res.end('hello world');
}
// 顺序出错,调用了hello,由于hello中没有调用next将导致无法执行.
var app = connect().use(hello).use(logger).listen(3000);
// 正确调用方式
var app = connect().use(logger).use(hello).listen(3000);
