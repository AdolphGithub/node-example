// 代码1 start
// var connect = require('connect');
// var methodOverride = require('method-override');
// // 基本用法.
// connect()
//   .use(methodOverride('__method__'))
//   .use(function(req,res){
//     console.log('%s %s',req.method,req.url);
//     res.end('hello world');
//   })
//   .listen(3000);
// 代码2 end

var connect = require('connect');
var bodyParser = require('body-parser');
var update = require('./middleware/update');
var edit = require('./middleware/edit');
var morgan = require('morgan');
var methodOverride = require('method-override');

connect()
  .use(morgan('dev'))
  .use(methodOverride('__method__'))
  .use(bodyParser())
  .use(function(req,res,next){
    // 获取原始的方法
    console.log('%s',req.originalMethod);
    next();
  })
  .use(edit)
  .use(update)
  .listen(3000);
