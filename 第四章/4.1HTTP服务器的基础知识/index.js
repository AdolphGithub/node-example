var http = require('http');
var server = http.createServer(function(req,res){
  var body ='hello world';
  // 设置响应码
  res.statusCode = 301;
  // 设置请求头
  res.setHeader('Content-Length',body.length);
  res.setHeader('Content-Type','text/plain');
  // 输出内容.
  res.write(body);
  res.end();
}).listen(8080);
