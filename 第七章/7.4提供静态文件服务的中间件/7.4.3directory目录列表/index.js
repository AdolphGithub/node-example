// 取代 directory serve-index
// 代码1 start
// var connect = require('connect');
// var serveIndex = require('serve-index');
// var serveStatic = require('serve-static');
// connect()
//   .use(serveIndex('public'))
//   .use(serveStatic('public'))
//   .listen(3000);
// 代码1 end
var connect = require('connect');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');

connect()
  // 域名的访问路径.
  .use('/files',serveIndex('public',{
    icons:true,
    hidden:true
  }))
  .use('/files',serveStatic('public',{
    hidden:true
  })).listen(3000);
