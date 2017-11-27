const http = require('http');
const fs   = require('fs');

var server = http.createServer(function(request,response){
    if(request.url == '/'){
        // 读取title.json
        fs.readFile('./title.json',function(err,data){
            if(err){
                console.dir(err);
                response.end('Server Error');
            }else{
                var titles = JSON.parse(data);
                // 开始读取文件.
                fs.readFile('./template.html',function(err,data){
                    if(err){
                        console.dir(err);
                        response.end('Server Error');
                    }else{
                        var tmp = data.toString();
                        console.dir(tmp);
                        var html = tmp.replace('%',titles.join('</li><li>'));
                        response.writeHead(200,{'Content-Type':'text/html'});
                        response.end(html);
                    }
                });
            }
        });
    }
});

server.listen(3000,function(){
    console.dir('server running http://localhost:3000');
});