"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _pattern = require("../../../utils/pattern.js");
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var PATTERN = new RegExp("([0-9]{4})[\\.\\/\\s]" + "(?:(".concat((0, _pattern.matchAnyPattern)(_constants.MONTH_DICTIONARY), ")|([0-9]{1,2}))[\\.\\/\\s]") + "([0-9]{1,2})" + "(?=\\W|$)", "i");
var YEAR_NUMBER_GROUP = 1;
var MONTH_NAME_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;
var NLCasualYearMonthDayParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function NLCasualYearMonthDayParser() {
    _classCallCheck(this, NLCasualYearMonthDayParser);
    return _callSuper(this, NLCasualYearMonthDayParser, arguments);
  }
  _inherits(NLCasualYearMonthDayParser, _AbstractParserWithWo);
  return _createClass(NLCasualYearMonthDayParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : _constants.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
      if (month < 1 || month > 12) {
        return null;
      }
      var year = parseInt(match[YEAR_NUMBER_GROUP]);
      var day = parseInt(match[DATE_NUMBER_GROUP]);
      return {
        day: day,
        month: month,
        year: year
      };
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);