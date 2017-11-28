// 异步执行函数.
function asyncFunction(callback){
    // 延迟200ms执行.
    setTimeout(callback,200);
}

var color = 'blue';

asyncFunction(function(){
    console.dir(color);
});

color = 'green';

// 另外一种保存color的值

function asyncFunction(callback){
    setTimeout(callback,200);
}

var color = 'blue';

(function(){
    asyncFunction(function(){
        console.dir(color);
    });
})(color)

color = 'green';