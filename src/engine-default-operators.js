'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operator = require('./operator');

Operators.push(new Operator('contains', (a, b) => a.indexOf(b) > -1, Array.isArray))
Operators.push(new Operator('doesNotContain', (a, b) => a.indexOf(b) === -1, Array.isArray))
Operators.push(new Operator('containsAnyOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for(var i = 0; i < b.length; i++){
    if(a.indexOf(b[i]) > -1){
      return true;
    }
  }
  return false;
}, Array.isArray))

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

//custom oprations
Operators.push(new _operator2.default('containsAnyOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for(var i = 0; i < b.length; i++){
    if(a.indexOf(b[i]) > -1){
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
