// 由于新版本已经将query丢弃改用qs,以下是qs的版本.
var qs = require('qs');
var connect = require('connect');
var bodyParser = require('body-parser');
connect()
  .use(bodyParser())
  .use(function(req,res,next){
    res.setHeader('Content-type','applicatin/json');
    // console.dir(qs.parse(req.query,{ ignoreQueryPrefix: true }));
    // undefined
    // req.query
    console.dir(req.query);
  })
  .listen(3000);
