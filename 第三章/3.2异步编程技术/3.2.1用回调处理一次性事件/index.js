const http = require('http');
const fs   = require('fs');
// 版本1 start
// var server = http.createServer(function(request,response){
//     if(request.url == '/'){
//         // 读取title.json
//         fs.readFile('./title.json',function(err,data){
//             if(err){
//                 console.dir(err);
//                 response.end('Server Error');
//             }else{
//                 var titles = JSON.parse(data);
//                 // 开始读取文件.
//                 fs.readFile('./template.html',function(err,data){
//                     if(err){
//                         console.dir(err);
//                         response.end('Server Error');
//                     }else{
//                         var tmp = data.toString();
//                         console.dir(tmp);
//                         var html = tmp.replace('%',titles.join('</li><li>'));
//                         response.writeHead(200,{'Content-Type':'text/html'});
//                         response.end(html);
//                     }
//                 });
//             }
//         });
//     }
// });
// 版本1 end  
// 版本2 start
//获取title数据
function getTitles(res){
    fs.readFile('./title.json',function(err,data){
        if(err) handlerError(err,res);
        getTemplate(200,res,JSON.parse(data));
    });
}
// 处理错误
function handlerError(err,res){
    console.log(err);
    res.end('server Error');
}
// 获取模板文件
function getTemplate(status,res,titles){
    fs.readFile('./template.html',function(err,data){
        if(err) handlerError(err,res);
        var tmp = data.toString();
        formatHtml(status,res,tmp.replace('%',titles.join('</li><li>')));
        
    });
}
// 输入模板内容.
function formatHtml(status,res,data){
    res.writeHead(status,{
        'Content-type':'html'
    });
    res.end(data);
}

var server = http.createServer(function(request,response){
    if(request.url == '/'){
        getTitles(response);
    }
});
// 版本2 end

server.listen(3000,function(){
    console.dir('server running http://localhost:3000');
});