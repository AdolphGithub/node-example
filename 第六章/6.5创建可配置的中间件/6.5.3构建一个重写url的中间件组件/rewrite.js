module.exports = function(){
  var url     = require('url');
  return function(req,res,next){
    var path = url.parse(req.url);
    // 设置正则.
    var match = path.match(/^\/blog\/posts\/(.+)/);
    if(match){
      
      findPostIdBySlug(match[1],function(err,id){
        if(err) return next(err);
        if(!id) return next(new Error('User not found'));
        req.url = '/blog/posts/'+id;
        next();
      });
    }else{
      next();
    }
  }
}
