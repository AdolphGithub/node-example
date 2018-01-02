var connect = require('connect');
var router = require('./middleware/router');
// 配置路由.
var routers = {
  'GET':{
    '^/users':function(req,res){
      res.end('tobi,loki,ferret');
    },
    '/user/:id':function(req,res,id){
      res.end('user ' + id);
    }
  },
  'DELETE':{
    '/user/:id':function(req,res,id){
      res.end('delete user' + id);
    }
  }
};
connect()
  .use(router(routers))
  .listen(3000);
