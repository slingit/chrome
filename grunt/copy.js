var _ = require("lodash");
var manifest = require(__dirname + "/../manifest.json");

var icons = _.values(manifest.icons).concat(
            _.values(manifest.browser_action.default_icon));

module.exports = {
  manifest: {
    files: [{ src: "manifest.json", dest: "build/" }]
  },
  icons: { files: [{ src: icons, dest: "build/" }]}
};
