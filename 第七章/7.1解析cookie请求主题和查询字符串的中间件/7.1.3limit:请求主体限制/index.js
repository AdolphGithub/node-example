// 由于新版本的connect的limit中间件已经被raw-body中间件给取代,所以这里写的是raw-body的写法
var connect = require('connect');
var rawBody = require('raw-body');

connect().use(function(req,res,next){
  rawBody(req,{
    'length':req.headers['content-length'],
    'limit':'32kb',
  },function(err,string){
    if(err) return next(err);
    req.text = string;
    next();
  })
})
