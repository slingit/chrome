//! Renders HTML views into layouts.

var fs = require("fs");
var path = require("path");
var recursive = require("recursive-readdir");
var async = require("async");
var mkdirp = require("mkdirp");
var cheerio = require("cheerio");

var assetPath = function(viewPath, dir, ext) {
	var dirname = path.dirname(viewPath).replace("views", dir);
	var filename = path.basename(viewPath).replace(/html$/, ext);
	return path.join(dirname, filename);
};

var insertAssets = function(viewPath, html, done) {
	var $ = cheerio.load(html);
	
	async.parallel([
		function(done) {
			var path = assetPath(viewPath, "style", "css");
			fs.exists(path, function(exists) {
				if (exists) {
					var link = $('<link rel="stylesheet">');
					link.attr("href", path);
					$("head").append(link);
				}
				done();
			});
		},
		function(done) {
			var path = assetPath(viewPath, "script", "js");
			fs.exists(path, function(exists) {
				if (exists) {
					var link = $('<script>');
					link.attr("src", path);
					$("body").append(link);
				}
				done();
			});
		}
	], function() {
		done($.html());
	});

};

module.exports = function() {
	var done = this.async();
	
	recursive("lib/views", function(error, viewPaths) {
		if (error) return done(error);
		async.each(viewPaths, function(viewPath, done) {
			fs.readFile(viewPath, function(error, viewBuffer) {
				if (error) return done(error);
				var view = viewBuffer.toString();
				var layoutName = "application.html";
				
				var lines = view.split("\n");
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];
					if (!line.match(/^<!\-\-/)) break;
					var match = line.match(/^<!\-\-\s*layout:\s*([^\s]*)\s*\-\->$/);
					if (match[1]) layoutName = match[1];	
				}
				var strippedView = lines.slice(i).join("\n");
				
				fs.readFile("lib/layouts/" + layoutName, function(error, layoutBuffer) {
					if (error) return done(error);
					var layout = layoutBuffer.toString();
					var replaced = layout.replace("<yield>", strippedView);
					insertAssets(viewPath, replaced, function(rendered) {
						var outputPath = viewPath.replace(/^lib/, "build");
						mkdirp(path.dirname(outputPath), function(error) {
							if (error) return done(error);
							fs.writeFile(outputPath, rendered, done);
						});
					});
				});
			});
		}, done);
	});
};
