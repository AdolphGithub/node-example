var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');

function filter(req){
  var type = req.getHeader('Content-type') || '';
  return 0 == type.indexOf('text/plain');
}

connect()
  .use(compression({
    level:3, // 压缩等级
    memLevel:8,  // 使用多少内存来加快压缩速度,
    filter:filter // 过滤
  }))
  .use(serveStatic('source'))
  .listen(3000);
