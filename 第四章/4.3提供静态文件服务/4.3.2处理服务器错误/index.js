// 引入模块.
var http = require('http');
var fs   = require('fs');
var path = require('path');
var url = require('url');
// 获取当前文件路径.
var root = __dirname;

var server = http.createServer(function(req,res){
  // 以前这个是一个对象,现在是一个字符串.
  var req_url = req.url;
  if(req_url == '/'){
    req_url = 'index.html';
  }
  var file_path = path.join(root,req_url);

  var stream = fs.createStream(file_path);
  // 注册error来捕捉错误消息.
  stream.on('error',function(){
    res.statusCode = 500;
    res.end('出现未知错误!');
  });
  stream.pipe(res);
});

server.listen(3000,function(){
  console.dir('server is running:'+server.address().port);
})
