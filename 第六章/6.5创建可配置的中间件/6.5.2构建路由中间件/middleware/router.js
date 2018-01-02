module.exports = function(router){
  var parse = require('url').parse;
  return function(req,res,next){
    // 判断是否有这个请求方法.
    if(!router[req.method]){
      next();
      return;
    }
    // 获取url
    var url = req.url;
    // 获取该请求方式下的所有路由.
    var routers = router[req.method];
    // 获取所有的路径.
    var paths = Object.keys(routers);
    // 循环路径
    for(var i=0; i<paths.length; i++){
      // 保存当前路径.
      var path = paths[i];
      // 得到回调函数.
      var fn = routers[path];
      // 替换路径.
      path = path.replace(/\//g,'\\/')
        .replace(/:(\w+)/g,'([^\\/]+)');
      // 准备正则.
      var re = new RegExp('^' + path + '$');
      // 获取匹配结果 以前代码的url是一个对象,这里是一个字符串对象
      var captures = url.match(re);
      if(captures){
        // 得到结果,获取得到的id
        var args = [req,res].concat(captures.slice(1));
        fn.apply(null,args);
        return;
      }
    }
    next();
  }
}
