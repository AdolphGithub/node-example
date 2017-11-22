// 普通读取数据流
// const fs = require('fs');
// var stream = fs.createReadStream('./resource.json');
// stream.on('data',function(chunk){
//     console.dir(chunk);
// });

// stream.on('end',function(){
//     console.dir('finished');
// });

// 读取用户的并展示出来
// const http = require('http');
// const fs   = require('fs');
// var server = http.createServer();
// server.on('request',function(request,response){
//     response.writeHead(200,{"Content-Type":"image/jpg"});
//     fs.createReadStream('001.jpg').pipe(response);
// });
// server.listen(3000);
// console.dir('server is running at http://localhost:3000');

const http = require('http');
const fs   = require('fs');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'image/jpg'});
    fs.createReadStream('001.jpg').pipe(response);
}).listen(3000);
