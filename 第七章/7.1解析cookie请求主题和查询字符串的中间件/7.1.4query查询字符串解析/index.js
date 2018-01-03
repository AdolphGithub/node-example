// 由于新版本已经将query丢弃改用qs,以下是qs的版本.
var qs = require('qs');
var connect = require('connect');
var url = require('url');
var bodyParser = require('body-parser');
connect()
  .use(bodyParser())
  .use(function(req,res,next){
    res.setHeader('Content-type','applicatin/json');
    // console.dir(qs.parse(req.query,{ ignoreQueryPrefix: true }));
    // undefined
    // req.query
    // 拿到解析的字符串.暂时不知道如何从request中获取,只能先获取url,然后用url模块的parse方法解析一下
    var query = url.parse(req.url);
    console.dir(qs.parse(query.query));
  })
  .listen(3000);
