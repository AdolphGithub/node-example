var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';
// 检查订阅列表
function checkForRSSFile(){
  fs.access('./rss_feeds.txt',fs.constants.R_OK | fs.constants.W_OK,(err) => {
    if(err){
      return next(new Error('Missing Rss File : ' + configFilename));
    }
    next(null,configFilename);
  });
}
// 读取订阅列表.
function readRSSFile(){
  fs.readFile(configFilename,(err,feedList) => {
    if(err) return next(err);

    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g,'')
      .split("\n");
    var random = Math.floor(Math.random() * feedList.length);
    next(null,feedList[random]);
  });
}
// 抓取数据.
function downloadRssFeed(feedUrl){
  request({'uri':feedUrl},function(err,res,body){
    if(err) return next(err);
    if(res.statusCode != 200){
      return next(new Error('Abnormal response status code '));
    }
    next(null,body);
  })
}
// 解析字符串
function parseRSSFeed(rss){
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if(!handler.dom.length){
    return next(new Error('No RSS items found'));
  }

  var item = handler.dom.pop();
  console.dir(item);
  // 源代码
  // var item = handler.dom.items.shift();
  // console.dir(item.title);
  // console.dir(item.link);
}

var tasks = [checkForRSSFile,readRSSFile,downloadRssFeed,parseRSSFeed];
// 执行.
function next(err,result){
  if(err) throw err;
  var currentTask = tasks.shift();
  if(currentTask){
    currentTask(result);
  }
}

next();
