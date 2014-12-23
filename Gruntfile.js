var fs = require("fs");

var tasks = fs.readdirSync("grunt/tasks").map(function(file) {
	var name = file.split(".").slice(0, -1).join(".") || file;
	var content = fs.readFileSync("grunt/tasks/" + file).toString();
	var firstLine = content.split("\n")[0];
	var desc = firstLine.replace(/^\/\/!\s*/, "");
	if (desc === firstLine) /* not a description */ desc = null;
	var task = require("./grunt/tasks/" + file);
	return [name, desc, task];
});

module.exports = function(grunt) {
	tasks.forEach(function(task) {
		grunt.registerTask.apply(grunt, task);
	});
	
	require("load-grunt-config")(grunt);
};
