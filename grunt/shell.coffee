os = require "os"

command = switch os.type()
  when "Darwin" then "./install_darwin build"
  when "Linux" then "./install_linux build"

module.exports = install: {command}
