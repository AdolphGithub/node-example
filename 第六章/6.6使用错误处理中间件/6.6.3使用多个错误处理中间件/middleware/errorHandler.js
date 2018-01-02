module.exports = function(err,req,res,next){
  console.error(err.stack);
  res.setHeader('Content-type','application/json');
  if(err.notFound){
    // 404未找到.
    res.statusCode = 404;
    res.end(JSON.stringify({error:err.message}));
  }else{
    // 500 错误.
    res.statusCode = 500;
    res.end(JSON.stringify({'error':'Internal Server Error'}));
  }
}
