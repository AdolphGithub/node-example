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
  // 查看是否有该文件.
  fs.stat(file_path,function(err,stat){
    // 是否有错误.
    if(err){
      if('ENOENT' == err.code){
        setStatus(404,'NOT FOUND');
      }else{
        setStatus(500,'Server Error');s
      }
    }else{
      res.setHeader('Content-length',stat.size);
      var stream = fs.createReadStream(file_path);
      stream.pipe(res);
      stream.on('error',function(){
        setStatus(500,'Server Error');
      });
    }
  });

  // var stream = fs.createStream(file_path);
  // // 注册error来捕捉错误消息.
  // // stream.on('error',function(){
  // //   res.statusCode = 500;
  // //   res.end('出现未知错误!');
  // // });
  // stream.pipe(res);

  function setStatus(code,msg){
    res.statusCode = code;
    res.end(msg);
  }
});

server.listen(3000,function(){
  console.dir('server is running:'+server.address().port);
})
