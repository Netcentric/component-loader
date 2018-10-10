"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

/**
 * Create a component and pass parameters if set
 */
var create = function create(Component, name, el) {
  var paramsAttr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'data-nc-params';
  var params = el.getAttribute("".concat(paramsAttr));
  var options = {}; // check if it can parse its params

  try {
    options = JSON.parse(params);
  } catch (error) {
    var errorTitle = "ERROR (".concat(name, " component): parsing '").concat(paramsAttr, "'");
    var errorText = "The following JSON '".concat(params, "' is not a valid JSON string");
    var errorEx = "(i.e. ".concat(paramsAttr, "-").concat(name, "='{ \"foo\": \"bar\" }')");
    console.error(errorTitle, "".concat(errorText, " ").concat(errorEx), el);
    return error;
  }

  try {
    var instance = new Component(el, options, name);
    return instance;
  } catch (error) {
    console.error("".concat(name, "(").concat(el.uuid, ") ERROR:"), el, options, error);
    return error;
  }
};

exports.create = create;

