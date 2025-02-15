'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;
function debug(message) {
  if (typeof process !== 'undefined' && process.env && process.env.DEBUG && process.env.DEBUG.match(/json-rules-engine/)) {
    console.log(message);
  }
}