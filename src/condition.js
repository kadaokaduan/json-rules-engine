'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash.isobjectlike');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Condition = function () {
  function Condition(properties) {
    _classCallCheck(this, Condition);

    if (!properties) throw new Error('Condition: constructor options required');
    var booleanOperator = Condition.booleanOperator(properties);
    Object.assign(this, properties);
    if (booleanOperator) {
      var subConditions = properties[booleanOperator];
      if (!Array.isArray(subConditions)) {
        throw new Error('"' + booleanOperator + '" must be an array');
      }
      this.operator = booleanOperator;
      // boolean conditions always have a priority; default 1
      this.priority = parseInt(properties.priority, 10) || 1;
      this[booleanOperator] = subConditions.map(function (c) {
        return new Condition(c);
      });
    } else {
      if (!properties.hasOwnProperty('fact')) throw new Error('Condition: constructor "fact" property required');
      if (!properties.hasOwnProperty('operator')) throw new Error('Condition: constructor "operator" property required');
      if (!properties.hasOwnProperty('value')) throw new Error('Condition: constructor "value" property required');

      // a non-boolean condition does not have a priority by default. this allows
      // priority to be dictated by the fact definition
      if (properties.hasOwnProperty('priority')) {
        properties.priority = parseInt(properties.priority, 10);
      }
    }
  }

  /**
   * Converts the condition into a json-friendly structure
   * @param   {Boolean} stringify - whether to return as a json string
   * @returns {string,object} json string or json-friendly object
   */


  _createClass(Condition, [{
    key: 'toJSON',
    value: function toJSON() {
      var stringify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var props = {};
      if (this.priority) {
        props.priority = this.priority;
      }
      var oper = Condition.booleanOperator(this);
      if (oper) {
        props[oper] = this[oper].map(function (c) {
          return c.toJSON(stringify);
        });
      } else {
        props.operator = this.operator;
        props.value = this.value;
        props.fact = this.fact;
        if (this.factResult !== undefined) {
          props.factResult = this.factResult;
        }
        if (this.result !== undefined) {
          props.result = this.result;
        }
        if (this.params) {
          props.params = this.params;
        }
        if (this.jsonpath) {
          props.jsonpath = this.jsonpath;
        }
      }
      if (stringify) {
        return JSON.stringify(props);
      }
      if (this.jsonpath) {
        props.jsonpath = this.jsonpath
      }
      return Promise.resolve(value);
    }

    /**
     * Takes the fact result and compares it to the condition 'value', using the operator
     *   LHS                      OPER       RHS
     * <fact + params + path>  <operator>  <value>
     *
     * @param   {Almanac} almanac
     * @param   {Map} operatorMap - map of available operators, keyed by operator name
     * @returns {Boolean} - evaluation result
     */

  }, {
    key: 'evaluate',
    value: function evaluate(almanac, operatorMap) {
      var _this = this;

      if (!almanac) return Promise.reject(new Error('almanac required'));
      if (!operatorMap) return Promise.reject(new Error('operatorMap required'));
      if (this.isBooleanOperator()) return Promise.reject(new Error('Cannot evaluate() a boolean condition'));

      var op = operatorMap.get(this.operator);
      if (!op) return Promise.reject(new Error('Unknown operator: ' + this.operator));

      return this._getValue(almanac) // todo - parallelize
      .then(function (rightHandSideValue) {
        return almanac.factValue(_this.fact, _this.params, _this.jsonpath).then(function (leftHandSideValue) {
          var result = op.evaluate(leftHandSideValue, rightHandSideValue);
          (0, _debug2.default)('condition::evaluate <' + leftHandSideValue + ' ' + _this.operator + ' ' + rightHandSideValue + '?> (' + result + ')');
          return { result: result, leftHandSideValue: leftHandSideValue, rightHandSideValue: rightHandSideValue, operator: _this.operator };
        });
      });
    }

  /**
   * Interprets .value as either a primitive, or if a fact, retrieves the fact value
   */
  _getValue (almanac) {
    let value = this.value
    if (isObjectLike(value) && value.hasOwnProperty('fact')) { // value: { fact: 'xyz' }
      return almanac.factValue(value.fact, value.params, value.jsonpath)
    }

  /**
   * Takes the fact result and compares it to the condition 'value', using the operator
   *   LHS                      OPER       RHS
   * <fact + params + path>  <operator>  <value>
   *
   * @param   {Almanac} almanac
   * @param   {Map} operatorMap - map of available operators, keyed by operator name
   * @returns {Boolean} - evaluation result
   */
  evaluate (almanac, operatorMap) {
    if (!almanac) return Promise.reject(new Error('almanac required'))
    if (!operatorMap) return Promise.reject(new Error('operatorMap required'))
    if (this.isBooleanOperator()) return Promise.reject(new Error('Cannot evaluate() a boolean condition'))

    let op = operatorMap.get(this.operator)
    if (!op) return Promise.reject(new Error(`Unknown operator: ${this.operator}`))

    return this._getValue(almanac) // todo - parallelize
      .then(rightHandSideValue => {
        return almanac.factValue(this.fact, this.params, this.jsonpath)
          .then(leftHandSideValue => {
            let result = op.evaluate(leftHandSideValue, rightHandSideValue)
            debug(`condition::evaluate <${leftHandSideValue} ${this.operator} ${rightHandSideValue}?> (${result})`)
            return { result, leftHandSideValue, rightHandSideValue, operator: this.operator }
          })
      })
  }

  }, {
    key: 'isBooleanOperator',
    value: function isBooleanOperator() {
      return Condition.booleanOperator(this) !== undefined;
    }
  }], [{
    key: 'booleanOperator',
    value: function booleanOperator(condition) {
      if (condition.hasOwnProperty('any')) {
        return 'any';
      } else if (condition.hasOwnProperty('all')) {
        return 'all';
      }
    }
  }]);

  return Condition;
}();

exports.default = Condition;
