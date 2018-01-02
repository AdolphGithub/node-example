var connect = require('connect');
var bodyParser = require('body-parser');
// 代码1  === start ===
// // 添加解析的中间件.
// var app = connect()
//   .use(bodyParser())
//   .use(function(req,res){
//     res.end('Registered new user:'+req.body.username);
//   }).listen(3000);
// 代码1  === end ===
var app = connect()
  .use(bodyParser())
  .use(function(req,res){
    console.log(req.body);
    console.log(req.files);
    res.end('thanks!');
  }).listen(3000);
