var http = require('http');
var fs   = require('fs');
var qs   = require('querystring');
// 创建服务器.
var server = http.createServer(function(req,res){
  if('/' == req.url){
    switch (req.method) {
      case 'GET':
        show(res,[]);
        break;
      case 'POST':
        add(req,res);
        break;
      default:
        badRequest(res);
    }
  }else{
    notFound(res);
  }
});
// 404响应.
function notFound(res){
  res.statusCode = 404;
  res.end('NOT FOUND');
}
// 错误请求.
function badRequest(res){
  res.statusCode = 500;
  res.end('Server Error');
}
// 构建字符串.
function show(res,items){
  var html = [
    '<html>',
      '<head>',
        '<title>TODO LIST</title>',
        '<meta http-equiv="Content-type" content="text/html;charset=utf-8"/>',
      '</head>',
      '<body>',
        '<ul>',
          items.map(function(item){
            return '<li>' + item + '</li>';
          }),
        '</ul>',
        '<form method="post">',
          '<p><input type="text" name="item" /></p>',
          '<p><input type="submit" value="Add Item" /></p>',
        '</form>',
      '</body>',
    '</html>'
  ].join('');
  res.setHeader('Content-type','text/html;charset=utf-8');
  // Buffer.byte已经被丢弃.
  res.setHeader('Content-length',Buffer.byteLength(html));
  res.end(html);
}
// 解析post提交的数据.
function add(req,res){
  var body  = '',
      items = [];
  // 设置编码
  req.setEncoding('utf8');
  req.on('data',function(chunk){
    body += chunk;
  });
  req.on('end',function(){
    var obj = qs.parse(body);
    items.push(obj.item);
    show(res,items);
  });
}

server.listen(3000,function(){
  console.dir('server is running:' + server.address().port);
});
