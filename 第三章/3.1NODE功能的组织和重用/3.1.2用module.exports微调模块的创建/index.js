var Curreny = require('./curreny');
var canadianDollar = 0.91;

var curreny = new Curreny(canadianDollar);
console.dir(curreny.canadianToUS(50));