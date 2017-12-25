var http = require('http');

var server = http.createServer(function(request,response){
  var items = [];
  console.dir(request.method);
  switch(request.method){
    case 'GET':
      // items.forEach(function(item,i){
      //   response.write(i + ') ' + item + '\n');
      // });
      // 修改后的文件路径.
      var body = items.map(function(item,i){
        return i + '} ' + item;
      }).join('\n');
      response.setHeader('Content-type',Buffer.byteLength(body));
      response.setHeader('Content-Type','text/plain;charset="utf-88"');
      response.end(body);
      break;
    case 'POST':
      var item = '';
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
