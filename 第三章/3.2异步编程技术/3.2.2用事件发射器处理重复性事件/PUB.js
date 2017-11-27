var EventEmitter = require('events').EventEmitter;

var channel = new EventEmitter();

channel.on('join',function(){
    console.dir('welcome');
});

channel.emit('join');