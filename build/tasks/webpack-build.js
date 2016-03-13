"use strict";

const gutil    = require("gulp-util");
const webpack  = require("webpack");
const notifier = require("node-notifier");

module.exports = function(options) {
  let root = options && options.root;

  if (!root) {
    throw new gutil.PluginError("webpack", "webpack-build: incorrect root path", {showStack: true});
  }

  let config = require("../config/webpack")(root);

  return function(cb) {

    webpack(config, function(err, stats) {
      if (!err) {
        err = stats.toJson().errors[0];
      }

      if (err) {
        notifier.notify({
          title: "webpack:build task",
          message: err
        });
        throw new gutil.PluginError("webpack-build", err, {showStack: true});
      }

      gutil.log("[webpack]", stats.toString({
        hash: true,
        version: false,
        timings: true,
        assets: true,
        chunks: false,
        modules: false,
        cached: true,
        colors: true
      }));

      cb();
    });

  };

};
