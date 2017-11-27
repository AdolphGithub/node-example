// Chat类.
var Chat = function(socket){
    this.socket = socket;
}
// 发送消息.
Chat.prototype.sendMessage = function(message,room){
    this.socket.emit('message',{
        'room':room,
        'text':message
    });
}
// 改变房间.
Chat.prototype.changeRoom = function(room){
    this.socket.emit('join',{
        'room':room
    });
}
// 处理命令格式.
Chat.prototype.processCommand = function(command){
    var words = command.split(' ');
    var command = words[0].substring(1,words[0].length).toLowerCase();
    var message = false;
    switch(command){
        // 加入房间.
        case 'join':
            words.shift();
            this.changeRoom(words.join(' '));
            break;
        // 修改昵称
        case 'nick':
            words.shift();
            this.socket.emit('nick',words.join(' '));
            break;
        default:
            message = '未知的命令';
            break;
    }
    return message;
}