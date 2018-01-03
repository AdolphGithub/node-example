// 以前的static已经被废弃了,使用新的serve-static来处理静态文件.
var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic('./public'))
  .listen(3000);
