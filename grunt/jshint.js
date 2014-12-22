var sh = require("execSync");

var gi = __dirname + "/../.gitignore";
var files = sh.exec("git ls-files; git ls-files -o --exclude-from " + gi).stdout;

module.exports = {
  all: files.split("\n").filter(function(file) { return file.match(/\.js$/); })
};
