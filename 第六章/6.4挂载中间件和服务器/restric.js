var restric = function(req,res,next){
  // 获取头部中的授权信息.
  var authorization = req.headers.authorization;
  // 如果没有授权信息,则直接交给下一个处理
  if(!authorization) return next(new Error('Unauthorized'));

  var parts = authorization.split(' ');
  var scheme = parts[0];
  // 得到一个授权的buffer
  // var auth = new Buffer(parts[1],'base64').toString().split(':');
  var auth = parts[1].toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  // 模拟授权
  if(user == '1138027478@qq.com' && pass == 'pass'){
    next();
  }else{
    return next(new Error('unauthorized'));
  }
  // authenticateWithDatabase(user,pass,function(err){
  //   if(err) return next(err);
  //
  //   next();
  // });
}

module.exports = restric;
