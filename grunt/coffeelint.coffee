sh = require "execSync"

{stdout} = sh.exec "git ls-files; git ls-files -o --exclude-from .gitignore"
files = stdout.split("\n").filter (file) -> file.match /\.coffee$/

module.exports = all: files
