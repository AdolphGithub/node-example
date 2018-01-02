var admin = function(req,res,next){
  switch (req.url) {
    case '/':
        res.end('try /users');
      break;
      case '/users':
        res.setHeader('Content-type','application/json');
        res.end(JSON.stringify(['tobi','loki','jane']));
    default:
        res.end('hello world');
  }
}

module.exports = admin;
