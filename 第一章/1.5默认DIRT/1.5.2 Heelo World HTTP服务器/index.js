// http server
const http = require('http');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-type':'html'});
    response.end('hello world');
}).listen(3000);
console.log('server is running at http://localhost:3000');

