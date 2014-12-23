sh = require "execSync"

command = "git ls-files; git ls-files -o --exclude-from .gitignore"
module.exports = -> sh.exec(command).stdout.split("\n")