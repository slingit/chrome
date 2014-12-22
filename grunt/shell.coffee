os = require "os"

command = switch os.type()
  when "Darwin" then "./install_darwin.swift build"
  when "Linux" then "./install_linux.sh build"
  else

module.exports = install: {command}
