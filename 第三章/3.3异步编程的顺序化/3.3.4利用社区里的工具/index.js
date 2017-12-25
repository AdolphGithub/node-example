var flow = require('nimble');

var exec = require('child_process').exec;
// 下载对应的文件
function downloadNodeVersion(version,destination,callback){
  var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
  var filepath = destination + '/' + version + '.tgz';
  exec('curl ' + url + ' > ' + filepath,callback);
}
// 并行.
flow.series([
  function(callback){
    flow.parallel([
      function(callback){
        console.dir('Downloading Node v0.4.6...');
        downloadNodeVersion('0.4.6','/tmp',callback);
      },
      function(callback){
        console.dir('Downloading Node v0.4.7...');
        downloadNodeVersion('0.4.7','/tmp',callback);
      }
    ]);
  },
  function(callback){
    console.dir('Create archive of downloaded files...');
    exec('tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
    function(error,stdout,stderr){
      console.dir('All done!');
      callback();
    });
  }
]);
