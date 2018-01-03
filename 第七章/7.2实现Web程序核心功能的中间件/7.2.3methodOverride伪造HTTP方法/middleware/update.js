// 修改姓名.
module.exports = function(req,res,next){
  if('PUT' != req.method){
    return next();
  }
  res.end('Update name to ' + req.body.user.name);
}
