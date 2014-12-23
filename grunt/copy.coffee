_ = require "lodash"
manifest = require __dirname + "/../manifest.json"

icons = _.values(manifest.icons)
  .concat _.values(manifest.browser_action.default_icon)

module.exports =
  manifest: files: [src: "manifest.json", dest: "build/"]
  icons: files: [src: icons, dest: "build/"]
  css: files: [
    src: ["style/**/*.css"], dest: "build/style/",
    cwd: "lib/", expand: true, flatten: true
  ]
