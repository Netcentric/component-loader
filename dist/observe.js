"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observe = void 0;

var _run = require("./run");

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */
var observe = function observe() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;
  var initAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-nc';
  // create observer and check for new nodes added
  var observer = new MutationObserver(function (mutations) {
    return mutations.forEach(function (mutation) {
      // only if there are new nodes added
      if (mutation.addedNodes.length > 0) {
        // should be a array of 1 lenght always.
        mutation.addedNodes.forEach(function (node) {
          if (node.querySelector) {
            (0, _run.run)(node, initAttr);
          }
        });
      }
    });
  });
  observer.observe(element, {
    subtree: true,
    childList: true
  });
};

exports.observe = observe;

