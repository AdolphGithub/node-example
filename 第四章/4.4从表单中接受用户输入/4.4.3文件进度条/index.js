var http = require('http');
var fs   = require('fs');
var path = require('path');
var formidable = require('formidable');
var server = http.createServer(function(req,res){
  var method = req.method;
  switch (method) {
    case 'GET':
      // 这里要读取文件.
      show(req,res);
      break;
    case 'POST':
      upload(req,res);
      break;
    default:
      res.statusCode = 500;
      res.end('Server Error');
  }
});
// 渲染对应的文件.
function show(req,res){
  var url = '/index.html',
      root= __dirname,
      file_path = path.join(root,url);
  fs.stat(file_path,function(ereqrr,stat){
    if(err){
      if('ENOENT' == err.code){
        notFound(res);
      }else{
        badRequest(res);
      }
    }else{
      var stream = fs.createReadStream(file_path);
      stream.pipe(res);
      stream.on('error',function(){
        badRequest(res);
      });
    }
  });
}
// 上传事件.
function upload(req,res){
  if(!isFormData(req)){
    res.statusCode = 400;
    res.end('Bad Request:expecting multipart/form-data');
    return;
  }
  var form = new formidable.IncomingForm();
  // 设置解析值.
  form.encoding = 'utf-8';
  // 监听filed事件
  form.on('filed',function(filed,value){
    console.dir(filed);
    console.dir(value);
  });
  // 监听file事件
  form.on('file',function(name,file){
    console.dir(name);
    console.dir(file);
  });
  // 监听文件上传进度.
  form.on('progress',function(bytesReceived,byteExpecte){
    var percent = Math.floor(bytesReceived / byteExpecte * 100);
    console.dir(percent);
  });
  // 解析完成.
  form.on('end',function(){
    res.end('upload complete');
  });
  // 开始解析
  form.parse(req);
}

function isFormData(req){
  var type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}

function notFound(res){
  res.statusCode = 404;
  res.end('NOT FOUND');
}

function badRequest(res){
  res.statusCode = 500;
  res.end('Bad Request');
}

server.listen(3000,function(){
  console.dir('server is running:3000');
});
