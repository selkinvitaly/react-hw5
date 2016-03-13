"use strict";

const path     = require("path");
const hash     = require("../helpers/hash");
const webpack  = require("webpack");
const autopref = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev     = require("../helpers/is-dev");
const isWatched = require("../helpers/is-watched");

module.exports = function(root) {

  let options = {
    context: root,
    entry: {
      vendor: ["react", "react-dom"],
      app: ["./frontend/js/index"]
    },
    output: {
      path: path.join(root, "./dist/"),
      filename: hash("assets/js/[name].js", "chunkhash", isDev),
      chunkFilename: hash("assets/js/[id].js", "chunkhash", isDev),
      publicPath: "",
      pathinfo: isDev
    },
    debug: isWatched,
    devtool: isWatched ? "cheap-module-inline-source-map" : null,
    resolve: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".js", ".jsx"]
    },
    resolveLoader: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".loader.js", ".js"],
      moduleTemplates: ["*-loader", "*"]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      }),
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin(hash("assets/css/[name].css", "contenthash", isDev)),
      new HtmlWebpackPlugin({
        minify: false,
        hash: false,
        inject: true,
        template: "frontend/html/index.html"
      })
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(root, "./frontend/js/"),
          loader: "babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-runtime"
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract("style", isDev ? "css!postcss!stylus?resolve url" : "css?minimize!postcss!stylus?resolve url")
        }
      ]
    },
    postcss: function () {
      return [autopref({
        browsers: ["last 2 versions", "Firefox ESR", "ie >= 9"]
      })];
    }
  };

  // minification
  if (!isDev) {
    options.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          "warnings": false,
          "drop_debugger": true,
          "drop_console" : true,
          "unsafe": true
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    );
  }

  return options;
};
