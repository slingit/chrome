var path = require("path");

module.exports = function(viewPath, dir, ext) {
	var dirname = path.dirname(viewPath).replace(/(views)|(layouts)/, dir);
	var filename = path.basename(viewPath).replace(/html$/, ext);
	return path.join(dirname, filename);
};
