module.exports = function(req,res,next){
  if(req.url.match(/^\/pet\/(.+)/)){
    foo();
  }else{
    next();
  }
}
