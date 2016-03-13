"use strict";

const path = require("path");

module.exports = function(root) {

  return {
    contentBase: path.join(root, "./dist"),
    hot: true,
    proxy: [{
      path: "/api/*",
      target: "http://localhost:3001"
    }],
    stats: { colors: true }
  };

};
