var vhost = require('vhost');
var connect = require('connect');
var server = connect();
var app = require('./sites/expressjs.dev');
// 需要在hosts中加入一下的域名
server.use(vhost('www.baidu.com',app));

server.listen(3000);
// 不写多个了.只是循环添加.
