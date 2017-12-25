// // 代码1.start
// var http = require('http');
// // 创建服务器
// var server = http.createServer(function(request,response){
//   request.setEncoding = 'utf8';
//   request.on('data',function(chunk){
//     console.dir('parsed',chunk);
//   });
//
//   request.on('end',function(){
//     console.dir('done parsing');
//     response.end();
//   });
// });
// // 监听端口.
// server.listen(3000,function(){
//   console.dir('localhost is runing port:' + server.address().port);
// });
// // 代码2.end

// POST 请求体字符串缓存
var http = require('http');
var url  = require('url');
var items = [];

var server = http.createServer(function(request,response){
  switch (request.method) {
    case 'POST':
      var item = '';
      request.setEncoding('utf8');
      request.on('data',function(chunk){
        item += chunk;
      });
      request.on('end',function(){
        items.push(item);
        response.end('OK \n');
      });
      break;
    default:
      response.end('hello world');
  }
});

server.listen(3000,function(){
  console.dir('server is running localhost:' + server.address().port);
});
