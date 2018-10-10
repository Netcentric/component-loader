"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _components = require("./components");

/**
 * Constant with a object that contain collection of components classes.
 */
var register = function register(newComponents) {
  // register add the components to the available components
  Object.keys(newComponents).forEach(function (name) {
    _components.components[name] = newComponents[name];
  });
};

exports.register = register;

