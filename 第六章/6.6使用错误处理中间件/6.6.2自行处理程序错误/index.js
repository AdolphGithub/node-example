var connect = require('connect');
var errorHandler = require('./errorHandler');

connect()
  // .use(router(require('./routers/user')))
  .use(function(req,res,next){
    next(new Error('这里是一个错误'));
  })
  .use(errorHandler())
  .listen(3000);
