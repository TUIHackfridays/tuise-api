var swaggermerge = require('swagger-merge');
var fs           = require('fs');
var path         = require('path');
var YAML         = require('yaml-js');
var chalk       = require('chalk');
var arguments    = require('minimist')(process.argv.slice(2));

var _error = chalk.bold.red;
var _warning = chalk.bold.yellow;
var _info = chalk.bold.blue;
var _success = chalk.bold.green;
var swaggerfiles = [];
var destination  = (arguments.d || arguments.destination || 'bundled_result') + '.json'
var info         = {
    version: "1.0.0",
    title: "TUIse",
    description: "A bot designed by TUI HackFridays\n"
};
var schemes      = ['http', 'https'];
var host         = 'api.tuise.eu';
var basePath     = '/v1';

for(var index in arguments._) {
  var file = arguments._[index];
  if(fs.existsSync(file)) {
    var ext = path.extname(file);
    if(ext == '.yaml' || ext == '.yml') {
      var obj = YAML.load(fs.readFileSync(file));
      swaggerfiles.push(obj);
    } else if (ext == '.json') {
      swaggerfiles.push(fs.readFileSync(file));
    } else {
      console.log(_error('[ERROR]'), 'Can\'t parse the file - ', file);
    }
  }
}

if(swaggerfiles.length > 0) {
  swaggermerge.on('warn', function (msg) {
    console.log(_warning('[WARNING]'), msg);
  });

  var merged = swaggermerge.merge(swaggerfiles, info, basePath, host, schemes)

  fs.writeFile(destination, JSON.stringify(merged, null, 2), function (err) {
    if (err)
      return console.error('[ERROR]',err);
    console.log(_info('[INFO]'), 'Merged all the files into', _success(destination));
  });
} else {
  console.log(_info('[INFO]'), 'No files to merge.');
}
