'use strict'

import Operator from './operator'

let Operators = []
Operators.push(new Operator('equal', (a, b) => a === b))
Operators.push(new Operator('notEqual', (a, b) => a !== b))
Operators.push(new Operator('in', (a, b) => b.indexOf(a) > -1))
Operators.push(new Operator('notIn', (a, b) => b.indexOf(a) === -1))

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

Operators.push(new Operator('containsAllOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new Operator('containsAnyOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0],b[i][1]);
    if (patt.test(a) == true) {
      return true;
    }
  }
  return false;
}, Array.isArray));

Operators.push(new Operator('containsAllOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0],b[i][1]);
    if (patt.test(a) == false) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new Operator('doesntContainsAnyOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) > -1) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new Operator('doesntContainsAllOf', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return true;
    }
  }
  return false;
}, Array.isArray));

Operators.push(new Operator('doesntContainsAnyOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0],b[i][1]);
    if (patt.test(a) == true) {
      return false;
    }
  }
  return true;
}, Array.isArray));

Operators.push(new Operator('doesntContainsAllOfByRegexp', function (a, b) {
  //console.log(a instanceof Array );
  //console.log(b instanceof Array );
  for (var i = 0; i < b.length; i++) {
    var patt = b[i].length == 1 ? new RegExp(b[i][0]) : new RegExp(b[i][0],b[i][1]);
    if (patt.test(a) == false) {
      return true;
    }
  }
  return false;
}, Array.isArray));


function numberValidator (factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN'
}
Operators.push(new Operator('lessThan', (a, b) => a < b, numberValidator))
Operators.push(new Operator('lessThanInclusive', (a, b) => a <= b, numberValidator))
Operators.push(new Operator('greaterThan', (a, b) => a > b, numberValidator))
Operators.push(new Operator('greaterThanInclusive', (a, b) => a >= b, numberValidator))

export default Operators
