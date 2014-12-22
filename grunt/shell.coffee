os = require "os"

command = switch os.type()
  when "Darwin" then "./install.swift build"
  when "Linux" then "./install_linux.sh"

module.exports = install: {command}
