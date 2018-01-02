// 用户数据.
var db = {
  users:[
    {name:'tobi'},
    {name:'loki'},
    {name:'jane'}
  ]
};
// 用户中间件
function users(req,res,next){
  // 正则 /users/tobi  匹配路由
  var match = req.url.match(/^\/users\/(.+)/);
  if(match){
    // 得到用户. 这里代码有问题,请注意一下.要搜索.哦
    var user = db.users[match[1]];
    // 判断用户是否存在.
    if(user){
      // 显示用户数据.
      res.setHeader('Content-type','application/json');
      res.end(JSON.stringify(user));
    }else{
      // 提示错误,报出异常.
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  }else{
    next();
  }
}

module.exports = users;
