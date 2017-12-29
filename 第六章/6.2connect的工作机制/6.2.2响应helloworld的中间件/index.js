function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}

function hello(req,res){
  res.setHeader('Content-type','text/plain');
  res.end('Hello world');
}
var connect = require('connect');
var app = connect();
// 引用中间件并监听3000端口
app.use(logger).use(hello).listen(3000);
