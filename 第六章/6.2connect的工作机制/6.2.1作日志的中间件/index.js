function logger(req,res,next){
  console.log('%s %s',req.method,req.url);
  next();
}

var connect = require('connect');
var app = connect();
// 使用中间件
app.use(logger);
app.listen(3000);
