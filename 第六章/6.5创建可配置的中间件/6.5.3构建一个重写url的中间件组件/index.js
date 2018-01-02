var connect = require('connect');
var rewrite  = require('./rewrite');

connect().use(rewrite).listen(3000);
