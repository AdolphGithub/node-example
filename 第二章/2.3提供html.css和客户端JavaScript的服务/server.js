// 服务器资源
const http = require('http');
// 获取文件类型的库
const mime = require('mime');
// 引用路径
const path = require('path');
// 引入文件
const fs   = require('fs');
// 缓存
var cache = {};

/**
 * 构建404响应
 * @param {*} response 
 */
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.end('NOT FOUND 404');
}

/**
 * 渲染文件.
 * @param {*} response 
 * @param {*} filePath 
 * @param {*} data 
 */
function sendFile(response,filePath,data){
    response.writeHead(200,{
        'Content-Type':mime.lookup(path.basename(filePath))
    });
    response.end(data);
}

/**
 * 渲染文件
 * @param {*} response 
 * @param {*} file_path 
 * @param {*} cache 
 */
function callServerStatic(response,file_path,cache){
    if(cache[file_path]){
        sendFile(response,file_path,cache[file_path]);
    }else{
        fs.access(file_path,fs.constants.R_OK | fs.constants.W_OK,function(err){
            if(err){
                send404(response);
            }else{
                fs.readFile(file_path,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[file_path] = data;
                        sendFile(response,file_path,data);
                    }
                });
            }
        });
    }
}
/**
 * 创建服务器.
 */
var server = http.createServer(function(request,response){
    if(request.url == '/'){
        var file_name = 'public/index.html';
    }else{
        var file_name = 'public' + request.url;
    }
    callServerStatic(response,file_name,cache);
});

// 监听端口.
server.listen(3000,function(){
    console.dir('server running on http://localhost:3000');
});