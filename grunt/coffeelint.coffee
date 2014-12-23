module.exports =
  all: require("./helpers/project-files")().
    filter (file) -> file.match /\.coffee$/
