const socket = require('socket.io');

var io;

var nameUsed = [];

var currentRoom = {};

var nickNames = {};

var guestNumber = 0;

exports.listen = function(server){

    io = socket.listen(server);

    socket.on('connection',function(client){

        guestRoomNumber = handlerAcceptNickName(client,nickNames,nameUsed,guestNumber);

        joinRoom(client,'Guest');

    });
    /**
     * 设置用户的昵称
     * @param {*} socket 
     * @param {*} nickNames 
     * @param {*} nameUsed 
     */
    function handlerAcceptNickName(socket,nickNames,nameUsed,guestNumber){
        if(nickNames[socket.id]){
            socket.emit('nameResult',{
                'success':false,
                'message':'名字已经被占用了'
            });
        }else{
            var nickname = 'Guest:' + guestNumber;
            nickNames[socket.id] = nickname;
            socket.emit('nameResult',{
                'success':true,
                'name':nickname
            });
            nameUsed.push(nickname);
            return guestNumber + 1;
        }
    }
    /**
     * 加入房间.
     * @param {*} socket
     */
    function joinRoom(socket,room){
        // 这里要处理一下 加入房间
        socket.join(room);
        currentRoom[socket.id] = room;
        socket.emit('joinRoom',{'room':room});
        // 查询所有的socket并且发布消息
        socket.broadcast.to(room).emit('message',{
            'text':nickNames[socket.io] + '加入房间,房间号为:' + room
        });
        // 开始获取改房间下的所有用户
        var users = socket.of('/').in(room).clients;
        if(users.length > 1){
            // 获取所有用户的昵称,别发布出去.
        }
    }
}