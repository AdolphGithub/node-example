module.exports = function(options){
  // 正则表达式
  var regexp = /:(\w+)/g;
  return function(req,res,next){
    // 替换.
    var str = options.replace(regexp,function(match,property){
      return req[property];
    });
    // 读取字符串
    console.log(str);
    next();
  };
}
