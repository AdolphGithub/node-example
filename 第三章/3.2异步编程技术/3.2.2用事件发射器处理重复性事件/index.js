const net = require('net');

var server = net.createServer(function(socket){
    // 触发用户的回复事件.
    // socket.on('data',function(data){
    //     socket.write(data);
    // });
    // 触发一次事件
    socket.once('data',function(data){
        socket.write(data);
    });

});

server.listen(3000);