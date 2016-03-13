"use strict";

const webpack = require("webpack");

module.exports = function(root, host, port) {
  let config = require("./webpack")(root);

  config.entry.app.unshift(`webpack-dev-server/client?http://${host}:${port}`, "webpack/hot/dev-server");
  config.watch = true;
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  return config;
};
