const http = require('http');

const fs   = require('fs');

const path = require('path');

const mime = require('mime');

var cache = {};
/**
 * 404响应
 * @param {*} response 
 */
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('ERROR 404 NOT FOUND');
    response.end();
}

/**
 * 显示文件内容
 * @param response 响应
 * @param filePath 文件路径
 * @param fileContents 文件内容
 */
function sendFile(response,filePath,fileContents){
    response.writeHead(200,{'Content-Type':mime.getType(path.basename(filePath))});
    response.end(fileContents);
}
/**
 * 获取静态资源
 * @param {*} response 响应
 * @param {*} cache    缓存
 * @param {*} absPath  绝对路径
 */
function serveStatic(response,cache,absPath){
    // 读取缓存文件
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    } else {
        // 判断文件是否存在.
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        // 保存文件到缓存中.
                        cache[absPath] = data;
                        // 重新读取文件,并且发送.
                        sendFile(response,absPath,data);
                    }
                });
            }else{
                send404(response);
            }
        });
    }
}
/**
 * 创建服务器
 * 并且获取正确资源
 */
var server = http.createServer(function(request,response){
    var filePath = false;
    if(request.url == '/'){
        filePath = './public/index.html';
    }else{
        filePath = './public' + request.url;
    }
    serveStatic(response,cache,filePath);
});
// 监听3000 端口
server.listen(3000,function(){
    console.dir('Server listening on Port 3000');
});