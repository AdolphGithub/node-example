// 文件监视器
function Watcher(watchDir,processedDir){
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}
// 引入扩展包
var events = require('events'),
    util   = require('util'),
    fs     = require('fs');
// 继承对象.
util.inherits(Watcher,events.EventEmitter);
// 观察文件
Watcher.prototype.watch = function(){
    var watcher = this;
    fs.readdir(this.watchDir,function(err,files){
        if(err) throw err;
        for(var index in files){
            watcher.emit('process',files[index]);
        }
    });
}
// 开始
Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(this.watchDir,function(){
        watcher.watch();
    });
}
var watchDir = './watch',
    processDir = './done',
    watcher = new Watcher(watchDir,processDir);

watcher.on('process',function(file){
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    // 批量移动文件.
    fs.rename(watchFile,processedFile,function(err){
        if(err) throw err;
    });
});
// 开始监听
watcher.start();