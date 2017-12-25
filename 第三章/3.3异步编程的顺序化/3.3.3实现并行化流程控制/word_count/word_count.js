var fs = require('fs');
    completeTasks = 0;
    tasks = [],
    wordCounts = {},
    filesDir = './text';
// 显示文字.
function checkIfComplete(){
  completeTasks++;
  if(completeTasks == tasks.length){
    for(var index in wordCounts){
      console.dir(index + ':' + wordCounts[index]);
    }
  }
}
// 统计单词数
function countWordsInText(text){
  var words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
  for(var index in words){
    var word = words[index];
    if(word){
      wordCounts[word] =
        (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  }
}

// 读取文件夹下所有内容. 比较消耗资源.
fs.readdir(filesDir,function(err,files){
  if(err) throw err;
  for(var index in files){
    var task = (function(file){
      return function(){
        fs.readFile(file,function(err,text){
          if(err) throw err;
          // 统计字数.
          countWordsInText(text);
          // 输出字数.
          checkIfComplete();
        })
      }
    })(filesDir + '/' + files[index]);
    tasks.push(task);
  }
  for(var task in tasks){
    tasks[task]();
  }
})
