var connect = require('connect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// 使用csrf
var csrf = require('csurf');
connect()
  .use(cookieParser('encrypt'))
  .use(bodyParser())
  .use(session())
  .use(csrf())
  .listen(3000);
