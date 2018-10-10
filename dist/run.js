"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _components = require("./components");

var _instances = require("./instances");

var _create = require("./create");

var _uuid = require("./uuid");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */
var run = function run() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;
  var initAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-nc';
  // gets all nodes at element with the initAttribute
  var nodes = Array.prototype.slice.call(element.querySelectorAll("[".concat(initAttr, "]"))); // Check if the element is also a component

  if (element.hasAttribute && element.hasAttribute(initAttr)) {
    nodes.push(element);
  } // check each node with the initAttr


  nodes.forEach(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(node) {
      var name;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // get the component that needs will load by attribute
              name = node.getAttribute(initAttr); // if there is a component available with the name

              if (!_components.components[name]) {
                _context.next = 6;
                break;
              }

              if (!_instances.instances[name]) {
                _instances.instances[name] = [];
              } // create a unique ID for the component + node


              node.uuid = (0, _uuid.uuid)(); // add to the active collection using a unique ID

              _instances.instances[name].push((0, _create.create)(_components.components[name], // Component Class
              name, // Component Name
              node, // Node
              "".concat(initAttr, "-params") // params to find components
              ));

              return _context.abrupt("return");

            case 6:
              return _context.abrupt("return", console.error("loaderRun cannot find a component named \"".concat(name, "\"")));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.run = run;

