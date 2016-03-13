"use strict";

module.exports = function(template, hash, dev) {
  return !dev ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
};
