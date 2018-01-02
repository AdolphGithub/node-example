module.exports = function(){
  // 判断环境.
  var env = process.env.NODE_ENV || 'development';
  return function(err,req,res,next){
    console.dir(err);
    res.statusCode = 500;
    switch(env){
      case 'development':
        res.setHeader('Content-type','application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server Error');
    }
  }
}
