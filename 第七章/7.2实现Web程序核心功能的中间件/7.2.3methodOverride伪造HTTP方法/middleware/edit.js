// 编辑中间件.
// 版本1  提交的时候,不能是put
// module.exports = function(req,res,next){
//   if('GET' != req.method) return next();
//   res.setHeader('Content-type','text/html');
//   res.write('<form method="put">');
//   res.write('<input type="text" name="user[name]" value="Tobi" />');
//   res.write('<input type="submit" value="Update" />');
//   res.write('</form>');
//   res.end();
// }


module.exports = function(req,res,next){
    if('GET' != req.method) return next();
    res.setHeader('Content-type','text/html');
    // 书上版本
    // res.write('<form method="post">');
    // res.write('<input type="hidden" name="__method__" value="PUT" />');
    // 实际版本
    res.write('<form method="post" action="' +req.url+ '?__method__=PUT">');
    res.write('<input type="text" name="user[name]" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
}
