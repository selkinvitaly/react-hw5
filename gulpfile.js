"use strict";

const gulp = require("gulp");

const root = __dirname;

const lazyTask = require("./build/helpers/lazy-task")(root);

gulp.task("clean", lazyTask("./build/tasks/clean", {
  dest: "./dist/"
}));

gulp.task("webpack:build", lazyTask("./build/tasks/webpack-build", {
  root: root
}));

gulp.task("webpack:server", lazyTask("./build/tasks/webpack-server", {
  root: root
}));

gulp.task("build", gulp.series("clean", "webpack:build"));
gulp.task("watch", gulp.series("clean", "webpack:server"));
