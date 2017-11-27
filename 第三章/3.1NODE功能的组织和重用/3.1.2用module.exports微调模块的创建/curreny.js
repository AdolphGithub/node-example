var Curreny = function(canadianDollar){
    this.canadianDollar = canadianDollar;
}

Curreny.prototype.roundTwoDecimals = function(amount){
    return Math.round(amount * 100) / 100;
}

Curreny.prototype.canadianToUS = function(canadian){
    return this.roundTwoDecimals(canadian * this.canadianDollar);    
}

Curreny.prototype.USToCanadian = function(us){
    return this.roundTwoDecimals(us / this.canadianDollar);
}

module.exports = exports = Curreny;
