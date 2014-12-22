fs = require "fs"
glob = require "glob"
cheerio = require "cheerio"
_ = require 'lodash'

scripts = []
for file in glob.sync "lib/html/**/*.html"
  $ = cheerio.load fs.readFileSync(file)
  $("script[src]").each -> scripts.push $(@).attr("src")

names = (_.last(script.split("/")).replace(/\.js$/, "") for script in scripts)

module.exports = _.zipObject names, scripts.map (script) ->
  { src: "lib#{script}", dest: "build#{script}" }
