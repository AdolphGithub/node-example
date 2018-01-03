// 书上由于是老版本,这里是新版本已经换成express-session
var connect = require('connect');
var session = require('express-session');
var favicon = require('serve-favicon');
// 依赖于cookie
var cookie  = require('cookie-parser');
// 设置持久话存储.
var RedisStore = require('connect-redis')(connect);
// 设置有效期
var hour  = 3600000;
var sessionOpts = {
  'key':'myapp_sid',
  'cookie':{
    'maxAge':hour * 24,
    'secure':true
  },
  'store':RedisStore
};

connect()
  .use(favicon('./favicon.ico'))
  .use(cookie('keyboard cat'))
  .use(session(sessionOpts))
  .use(function(req,res,next){
    var sess = req.session;
    if(sess.views){
      res.setHeader('Content-type','text/html');
      res.write('<p>views:'+ sess.views+'</p>');
      sess.views++;
      res.end()
    }else{
      sess.views = 1;
      res.end('welcome to the session demo.');
    }
  }).listen(3000);
