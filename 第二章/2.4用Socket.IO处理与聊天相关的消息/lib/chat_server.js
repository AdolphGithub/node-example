const socket = require('socket.io');

var io;

var nameUsed = [];

var currentRoom = {};

var nickNames = {};

var guestNumber = 0;

exports.listen = function(server){

    io = socket.listen(server);

    io.sockets.on('connection',function(client){
        // 分布昵称
        guestNumber = handlerAcceptNickName(client,nickNames,nameUsed,guestNumber);
        // 加入房间
        joinRoom(client,'Guest');
        // 处理用户消息
        handleMessageBroadcasting(client);
        // 修改昵称
        handlerChangeNickName(client,nickNames,nameUsed);
        // 设置房间
        handlerRoomJoining(client);
        // 获取服务器的所有房间
        client.on('rooms',function(){
            client.emit('rooms',io.of('/').adapter.rooms);
        });
        // 监听关闭事件.
        handlerDisconnection(client);
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
     * 加入房间.并发布消息.
     * @param {*} socket
     */
    function joinRoom(socket,room){
        // 这里要处理一下 加入房间
        socket.join(room);
        currentRoom[socket.id] = room;
        socket.emit('joinRoom',{'room':room});
        // 查询所有的socket并且发布消息
        socket.broadcast.to(room).emit('message',{
            'text':nickNames[socket.id] + '加入房间,房间号为:' + room
        });
        // 开始获取改房间下的所有用户 老版本:io.sockets.clients(room);
        var users = io.of('/').in(room).clients;
        if(users.length > 1){
            // 获取所有用户的昵称,一起发布出去.
            var usersInRoomSummary = '用户:' + nickNames[socket.io];
            for(var index in users){
                var socketid =  users[index].id;
                if(socket.id != socketid){
                    if(index > 0){
                        usersInRoomSummary += ',';
                    }else{
                        usersInRoomSummary += nickNames[socketid];
                    }
                }
            }
            // 触发客户端的message事件.
            socket.emit('message',{
                'text':usersInRoomSummary
            });
        }
    }

    /**
     * 修改昵称
     * @param {*} socket 
     * @param {*} nickNames 
     * @param {*} nameUsed 
     */
    function handlerChangeNickName(socket,nickNames,nameUsed){
        // 判断昵称是否存在
        socket.on('nick',function(nickname){
            // 如果存在则直接报错
            if(nickNames.indexOf(nickname) > -1){
                socket.emit('nameResult',{
                    'success':false,
                    'message':'名称被占用了'
                });
            }else{
                // 获取以前的昵称
                var prevName = nickNames[socket.id];
                // 找到对应的索引
                var prevNameIndex = nameUsed.indexOf(prevName);
                // 删除索引
                delete nameUsed[index];
                // 新增昵称
                nameUsed.push(nickname);
                // 修改昵称
                nickNames[socket.id] = nickname;
                socket.emit('nameResult',{
                    'success':true,
                    'name':nickname
                });
            }
        });
    }

    /**
     * 设置房间
     * @param {*} socket 
     */
    function handlerRoomJoining(socket){
        // 加入
        socket.on('join',function(room){
            socket.leave(currentRoom[socket.id]);
            joinRoom(socket,room.room);
        });
    }

    /**
     * 客户端断开链接
     * @param {*} socket 
     */
    function handlerDisconnection(socket){
        socket.on('disconnect',function(){
            var prevName = nickNames[socket.id];
            delete nameUsed[nameUsed.indexOf(prevName)];
            delete nickNames[socket.id];
        });
    }

    /**
     * 处理用户消息
     * @param {*} socket 
     */
    function handleMessageBroadcasting(socket){
        socket.on('message',function(message){
            socket.broadcast.to(message.room).emit('message',{
                text:nickNames[socket.id] + ':' + message.text
            });
        });
    }
}