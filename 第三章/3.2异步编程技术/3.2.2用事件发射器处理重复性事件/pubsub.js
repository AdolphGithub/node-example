// 普通的发布和预订系统
var EventEmitter = require('events').EventEmitter;
const net    = require('net');
// 创建发布对象
var channel = new EventEmitter();
// 用户登录集合
channel.clients = {};
// 订阅集合
channel.subscriptions = {};
// 有客户端链接时.
channel.on('join',function(id,client){
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId,message){
        if(id != senderId){
            this.clients[id].write(message);
        }
    }
    // 绑定事件.
    this.on('broadcast',this.subscriptions[id]);
    // 获取人数.
    var welcome = '总共多少人' + this.listeners('broadcast').length;
    client.write(welcome);
});
// 移除单个事件.
channel.on('leave',function(id){
    channel.removeListener('broadcast',this.subscriptions[id]);
    channel.emit('broadcast',id,id + '已经移除事件');
});
// 移除所有事件.
channel.on('shutdown',function(id){
    channel.emit('broadcast',id,'停止聊天了\n');
    channel.removeAllListeners('broadcast');
});
// 错误事件监听
channel.on('error',function(err){
    console.dir('ERROR:'+err.message);
});

// 新版本的node会自动监听connect事件,所以就不需要用on会监听.
var server = net.createServer(function(client){
    var id = client.remoteAddress + ':' + client.remotePort;
    // 连接上的时候.
    // client.on('connect',function(){
    //     console.dir('1123123213');
    //     channel.emit('join',id,client);
    // });
    channel.emit('join',id,client);
    // 发送数据的时候.
    client.on('data',function(data){
        data = data.toString();
        // 移除所有事件.
        if(data.indexOf('shutdown') == 0){
            channel.emit('shutdown');
        }
        // console.dir(data);
        channel.emit('broadcast',id,data);
    });

    client.on('close',function(){
        channel.emit('leave',id);
    });
});




// 另一种写法 没有实验过,请自行实验.
// var server = net.createServer();

// server.on('connect',function(client){
//     var id = client.remoteAddress + ':' + client.remotePort;
//     channel.emit('join',id,client);
// });

// server.on('data',function(data,client){
//     var id = client.remoteAddress + ':' + client.remotePort;
//     data = data.toString();
//     // console.dir(data);
//     channel.emit('broadcast',id,data);
// });

server.listen(3000,function(){
    console.dir('server is running http://127.0.0.1:3000');
})
