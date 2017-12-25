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
    case 'DELETE':
      var path = url.parse(request.uri).pathname;
      var i = parseInt(path.slice(1),10);
      if(isNaN(i)){
        response.statusCode = 400;
        response.end('Invalid item id');
      }else if(!items[i]){
        response.statusCode = 404;
        response.end('Item not found');
      }else{
        items.splice(i,1);
        response.end('OK \n');
      }
    default:
      response.end('hello world');
  }
});

server.listen(3000,function(){
  console.dir('server is running localhost:' + server.address().port);
});
