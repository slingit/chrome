os = require "os"

command = "./install_#{os.type().toLowerCase()} build"

module.exports = install: {command}
