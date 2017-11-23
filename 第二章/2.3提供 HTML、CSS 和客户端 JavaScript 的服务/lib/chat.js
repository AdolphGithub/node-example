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
        guestNumber = assignGuestName(client,guestNumber,nickNames,namesUsed);
        // 加入房间
        joinRoom(client,'Lobby');
        // 处理用户的消息
        handleMessageBroadcasting(client,nickNames);    
    });

    /**
     * 注册一个姓名.
     * @param {*} client 
     * @param {*} guestNumber 
     * @param {*} nickNames 
     * @param {*} namesUsed 
     */
    function assignGuestName(socket,guestNumber,nickNames,namesUsed){
        var name = 'Guest' + guestNumber;
        nickNames[socket.id] = name;
        socket.emit('nameResult',{
            'success':true,
            'name':name
        });
        namesUsed.push(name);
        return guestNumber + 1;
    }
    /**
     * 加入房间
     * @param {*} socket 
     * @param {*} room_name 
     */
    function joinRoom(socket,room_name){
        socket.join(room_name);    // 加入房间
        currentRoom[socket.id] = room_name;
        socket.emit('joinResult',{'room':room_name});
        socket.broadcast.to(room_name).emit('message',{
            'text':nickNames[socket.id] + ' has join ' + room_name + '.'
        });

        var usersInRoom = io.socket.clients(room_name);
        if(usersInRoom.length > 1){
            var usersInRoomSummary = 'Users currently in ' + room_name + ': ';
            for(var index in usersInRoom){
                var userSocketId = usersInRoom[index].id;
                if(userSocketId != socket.id){
                    if(index > 0){
                        usersInRoomSummary += '. ';
                    }
                    usersInRoomSummary += nickNames[userSocketId];
                }
            }
            usersInRoomSummary += '.';
            socket.emit('message',{text:usersInRoomSummary});
        }
    }
    /**
     * 处理消息.
     * @param {*} socket 
     */
    function handleMessageBroadcasting(socket){
        socket.on('message',function(message){
            socket.broadcast.to(message.room).emit('message',{
                text:nickNames[socket.id] + ':' + message.text;
            });
        });
    }
}