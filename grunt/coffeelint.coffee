sh = require "execSync"

gi = __dirname + "/../.gitignore"
{stdout} = sh.exec "git ls-files; git ls-files -o --exclude-from #{gi}"
files = stdout.split("\n").filter (file) -> file.match /\.coffee$/

module.exports = all: files
