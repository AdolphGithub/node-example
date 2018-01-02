var connect = require('connect');
connect().use(function hello(req,res){
  // ReferenceError错误
  foo();
  res.setHeader('Content-type','text/plain');
  res.end('Hello world');
}).listen(3000);
