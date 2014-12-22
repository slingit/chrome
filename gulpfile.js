var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");

gulp.task("clean", function() {
  return del(["build"]);
})

gulp.task("build", ["clean"], function() {
  return gulp.src("./manifest.json").pipe(gulp.dest("./build/"));
});

gulp.task("install", shell.task("./install.swift build"));

gulp.task("default", ["build", "install"]);
