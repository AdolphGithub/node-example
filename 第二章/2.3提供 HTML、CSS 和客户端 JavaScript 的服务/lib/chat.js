var socketio = require('socket.io');

var io;

var guestNumber = 1;

var nickNames = {};

var namesUsed = [];

var currentRoom = {};

exports.listen = function(server){
    // 监听server
    io = socketio.listen(server);
    // 设置日志等级
    io.set('log level',1);
    // 链接进来时,需要分配用户名,还要分配用户进入房间
    io.sockets.on('connection',function(client){
        // 分配用户名.
        
    });
}