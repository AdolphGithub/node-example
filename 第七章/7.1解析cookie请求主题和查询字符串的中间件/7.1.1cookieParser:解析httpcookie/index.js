// 代码1    start
// var connect = require('connect');
// var cookieParser = require('cookie-parser');
// connect()
//   .use(cookieParser('tobi is a cool ferret'))
//   .use(function(req,res){
//     console.log(req.cookies);
//     res.end('Hello' + "\n")
//   })
//   .listen(3000);

// 注意  调用时,curl http://localhost:3000/ -H 'Cookie: foo=bar: bar=baz'
// 是分号,而不是逗号


// 代码1    end

var connect = require('connect');
var app = connect().use(function(req,res){
  res.setHeader('Set-Cookie','foo=bar');
  res.setHeader('Set-Cookie','tobi=ferret;Expires=Tue, 08 Jun 2021 10:18:14 GMT');
  res.end('hello world');
}).listen(3000);
