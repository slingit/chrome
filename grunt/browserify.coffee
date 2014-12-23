fs = require "fs"
path = require "path"
glob = require "glob"
cheerio = require "cheerio"
_ = require 'lodash'
viewAssetPath = require "./helpers/view-asset-path"

scripts = []
for file in glob.sync "lib/{views,layouts}/**/*.html"
  $ = cheerio.load fs.readFileSync(file)
  $("script[src]").each -> scripts.push path.join "lib", $(@).attr("src")
  scriptPath = viewAssetPath(file, "script", "js")
  scripts.push scriptPath if fs.existsSync scriptPath

scripts = _.uniq scripts

names = scripts.map (script) ->
  _.last(script.split("/")).replace(/\.js$/, "")

module.exports = _.zipObject names, scripts.map (script) ->
  src: script
  dest: script.replace(/^lib\//, "build/")
