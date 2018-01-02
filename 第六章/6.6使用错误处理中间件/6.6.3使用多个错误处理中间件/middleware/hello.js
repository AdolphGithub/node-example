// hello world 中间件.
module.exports = function(req,res,next){
  if(req.url.match(/^hello/)){
    res.end('hello world' + "\n");
  }else{
    next();
  }
}
