// 普通消息.
function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}
// 系统消息.
function divSystemContentElement(message){
    return $('<div></div>').html([
        '<i>',message,'</i>'
    ].join(''));
}
// 处理用户的输入.
function processUserInput(chatApp,socket){
    // 获取要发送的消息
    var message = $('#send-message').val();
    var systemMessage;
    // 判断是否是系统消息
    if(message.charAt(0) == '/'){
        systemMessage = chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        // 这里是普通消息. 发送普通消息
        chatApp.sendMessage(message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}