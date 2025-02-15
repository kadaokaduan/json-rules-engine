'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operator = require('./operator');

var _operator2 = _interopRequireDefault(_operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Operators = [];
Operators.push(new _operator2.default('equal', function (a, b) {
  return a === b;
}));
Operators.push(new _operator2.default('notEqual', function (a, b) {
  return a !== b;
}));
Operators.push(new _operator2.default('in', function (a, b) {
  return b.indexOf(a) > -1;
}));
Operators.push(new _operator2.default('notIn', function (a, b) {
  return b.indexOf(a) === -1;
}));

Operators.push(new _operator2.default('contains', function (a, b) {
  return a.indexOf(b) > -1;
}, Array.isArray));
Operators.push(new _operator2.default('doesNotContain', function (a, b) {
  return a.indexOf(b) === -1;
}, Array.isArray));

Operators.push(new _operator2.default('containsAnyOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) > -1) {
      return true;
    }
  }
  return false;
}, Array.isArray));

Operators.push(new _operator2.default('containsAllOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new _operator2.default('containsAnyOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0], b[i][1]);
    if (patt.test(a) == true) {
      return true;
    }
  }
  return false;
}, Array.isArray));

Operators.push(new _operator2.default('containsAllOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0], b[i][1]);
    if (patt.test(a) == false) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new _operator2.default('doesntContainsAnyOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) > -1) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new _operator2.default('doesntContainsAllOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return true;
    }
  }
  return false;
}, Array.isArray));

Operators.push(new _operator2.default('doesntContainsAnyOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0], b[i][1]);
    if (patt.test(a) == true) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new _operator2.default('doesntContainsAllOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0], b[i][1]);
    if (patt.test(a) == false) {
      return true;
    }
  }
  return false;
}, Array.isArray));

function numberValidator(factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN';
}
Operators.push(new _operator2.default('lessThan', function (a, b) {
  return a < b;
}, numberValidator));
Operators.push(new _operator2.default('lessThanInclusive', function (a, b) {
  return a <= b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThan', function (a, b) {
  return a > b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThanInclusive', function (a, b) {
  return a >= b;
}, numberValidator));

exports.default = Operators;