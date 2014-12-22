_ = require "lodash"
manifest = require __dirname + "/../manifest.json"

icons = _.values(manifest.icons)
  .concat _.values(manifest.browser_action.default_icon)

module.exports =
  manifest: files: [src: "manifest.json", dest: "build/"]
  icons: files: [src: icons, dest: "build/"]
  html: files: [
    src: ["html/**/*.html"], dest: "build/html/",
    cwd: "lib/", expand: true, flatten: true
  ]
  js: files: [
    src: ["js/**/*.js"], dest: "build/js/",
    cwd: "lib", expand: true, flatten: true
  ]
