// 这个是虚拟的window对象
// 服务器版
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

var $ = require('jquery')(window);

// jQuery例子
$.post('/resource.json',function(data){ // 异步执行
    console.dir(data);
});

var data = $.post('/resource.json');    // 同步执行
console.dir(data);