var http = require('http');
var parser = require('url').parser;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req,res){
  var url = req.url;
  var path = join(root,url);
  var stream = fs.createReadStream(path);
  res.setHeader('Content-type','text/plain;charset=utf-8;');
  // 监听事件.
  // stream.on('data',function(chunk){
  //   res.write(chunk);
  // });
  // stream.on('end',function(){
  //   res.end(path);
  // });
  stream.pipe(res);
});
// 输出信息.
server.listen(3000,function(){
  console.dir('server is running:' + server.address().port);
});
