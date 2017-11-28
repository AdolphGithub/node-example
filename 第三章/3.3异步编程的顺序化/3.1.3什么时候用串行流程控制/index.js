// 第一个例子.
setTimeout(function(){
    console.dir('我是第一个执行');
    setTimeout(function(){
        console.dir('我是第二个执行');
        setTimeout(function(){
            console.dir('我是第三个执行');
        },200);
    },500);
},1000);

// 第二个例子.
var nimble = require('nimble');

nimble.series([
    function(callback){
        setTimeout(function(){
            console.dir('我是第一个执行.');
            callback();
        },1000);
    },
    function(callback){
        setTimeout(function(){
            console.dir('我是第二个执行');
            callback();
        },500);
    },
    function(callback){
        setTimeout(function(){
            console.dir('我是第三个执行.');
            callback();
        },100);
    }
]);