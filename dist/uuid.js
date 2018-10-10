"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = void 0;

var uuid = function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.floor(Math.random() * 16);
    var v = c === 'x' ? r : Math.floor(r % 3 + 8);
    return v.toString(16);
  });
};

exports.uuid = uuid;

