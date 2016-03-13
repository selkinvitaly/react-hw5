"use strict";

const webpack   = require("webpack");
const gutil     = require("gulp-util");
const DevServer = require("webpack-dev-server");
const notifier  = require("node-notifier");

const host = "localhost";
const port = 8080;

module.exports = function(options) {
  let root = options && options.root;

  if (!root) {
    throw new gutil.PluginError("webpack-dev-server", "webpack-server: incorrect root path", {showStack: true});
  }

  let configWebpack = require("../config/webpack-watch")(root, host, port);
  let configServer  = require("../config/webpack-server")(root);

  return function() {
    let server = new DevServer(webpack(configWebpack), configServer);

    server.listen(port, host, function(err) {

      if (err) {
        notifier.notify({
          title: "webpack:server task",
          message: err
        });

        throw new gutil.PluginError("webpack-dev-server", err, {showStack: true});
      }

      gutil.log("[webpack:server]", gutil.colors.magenta(`http://${host}:${port}/webpack-dev-server`));
    });
  };

};
