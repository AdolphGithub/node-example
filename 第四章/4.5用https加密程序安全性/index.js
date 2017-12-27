
// 生成key的命令
// openssl genrsa 1024 > key.pem
// 生成key-cert
// openssl req -x509 -new -key key.pem > key-cert.pem
var https = require('https');

var fs = require('fs');
// 设置加密的密钥.
var options = {
  key:fs.readFileSync('/var/www/.ssh/key.pem'),
  cert:fs.readFileSync('/var/www/.ssh/key-cert.pem')
}

https.createServer(options,function(req,res){
  res.statusCode = 200;
  res.end("Hello world\n");
}).listen(3000);
