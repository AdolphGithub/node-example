var socketio = require('socket.io');

var io;

var guestNumber = 1;

var nickNames = {};

var namesUsed = [];

var currentRoom = {};

exports.listen = function(server){
    // 监听server
    io = socketio.listen(server);
    // 设置日志等级 在1.0之前是这样子的  1.0过后被移除了
    // io.set('log level',1);
    // 链接进来时,需要分配用户名,还要分配用户进入房间
    io.sockets.on('connection',function(client){
        // 分配用户名.
        guestNumber = assignGuestName(client,guestNumber,nickNames,namesUsed);
        // 加入房间
        joinRoom(client,'Lobby');
        // 处理用户的消息
        handleMessageBroadcasting(client,nickNames);
        // 更改昵称
        handleNameChangeAttempts(client,nickNames,namesUsed);
        // 创建房间
        handleRoomJoining(client);

        client.on('rooms',function(){
            // 老版本的写法
            // socket.emit('rooms',io.sockets.manager.rooms);
            client.emit('rooms',io.of('/').adapter.rooms);
        });
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
            'text':nickNames[socket.id] + ' 加入 ' + room_name + '.'
        });
        // 这里是老版本的写法.
        // var usersInRoom = io.sockets.clients(room_name);
        // 新版本
        var usersInRoom = io.of('/').in(room_name).clients;
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
                text:nickNames[socket.id] + ':' + message.text
            });
        });
    }

    /**
     * 更改用户昵称
     * @param {*} socket 
     * @param {*} nickNames 
     * @param {*} namesUsed 
     */
    function handleNameChangeAttempts(socket,nickNames,namesUsed){
        socket.on('nameAttempt',function(name){
            if(name.indexOf('Guest') == 0){
                socket.emit('nameResult',{
                    success:false,
                    message:'名称不能以Guest开头'
                });
            }else{
                // 查看昵称是否占用.
                if(namesUsed.indexOf(name) === -1){
                    // 要删除以前的昵称 以前的名称
                    var previousName = nickNames[socket.id];
                    var previousNameIndex = namesUsed.indexOf(previousName);
                    // 设置当前姓名
                    nickNames[socket.id] = name;
                    // 删除以前的昵称让其他人可以使用.  
                    // 逻辑可以优化. namesUsed[previousNameIndex] = name;
                    // 这样可以释放保证数组的长度没有变.
                    delete namesUsed[previousNameIndex];
                    namesUsed.push(name);
                    // 重新触发
                    socket.emit('nameResult',{
                        'success':true,
                        'name': name
                    });
                }else{
                    socket.emit('nameResult',{
                        success:false,
                        message:'该名称已经被占用'
                    });
                }
            }
        })
    }

    /**
     * 创建房间.
     * @param {*} socket 
     */
    function handleRoomJoining(socket){
        socket.on('join',function(room){
            socket.leave(currentRoom[socket.id]);
            joinRoom(socket,room.newRoom);
        });
    }

    /**
     * 用户断开链接.
     * @param {*} socket 
     */
    function handleClientDisconnection(socket){
        socket.on('disconnect',function(){
            var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
            delete namesUsed[nameIndex];
            delete nickNames[socket.id];
        });
    }
}