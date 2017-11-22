// http server 另一种版本
const http = require('http');
var server = http.createServer();
server.on('request',function(request,response){
    response.writeHead(200,{'Content-type':'html'});
    response.end('hello world http server2');
});
server.listen(3000);
console.log('server is running at http://localhost:3000');