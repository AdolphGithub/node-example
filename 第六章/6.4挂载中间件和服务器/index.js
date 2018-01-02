var connect = require('connect');
// 验证的中间件
var restric = require('./restric');
// 后台中间件
var admin   = require('./admin');
// 日志中间件
function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}
// 显示中间件
function hello(req,res){
  res.setHeader('Content-type','text/plain');
  res.end('hello world');
}

connect().use(logger)
  .use('/admin',restric)
  .use('/admin',admin)
  .use(hello)
  .listen(3000);
