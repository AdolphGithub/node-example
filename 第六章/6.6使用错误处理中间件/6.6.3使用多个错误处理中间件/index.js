var connect = require('connect');
var hello   = require('./middleware/hello');
var users   = require('./middleware/users');
var pets    = require('./middleware/pets');
var errorHandler = require('./middleware/errorHandler');

var api     = connect()
  .use(users)
  .use(pets)
  .use(errorHandler);

var app = connect()
  .use(hello)
  .use('/api',api)
  .use(function(err,req,res,next){
    console.error(err);
  })
  .listen(3000);
