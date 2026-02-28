"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _pattern = require("../../../utils/pattern.js");
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
var _weekdays = require("../../../calculation/weekdays.js");
var _types = require("../../../types.js");
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
var PATTERN = new RegExp("(?:(?:\\,|\\(|\\（)\\s*)?" + "(?:on\\s*?)?" + "(?:(this|last|past|next)\\s*)?" + "(".concat((0, _pattern.matchAnyPattern)(_constants.WEEKDAY_DICTIONARY), "|weekend|weekday)") + "(?:\\s*(?:\\,|\\)|\\）))?" + "(?:\\s*(this|last|past|next)\\s*week)?" + "(?=\\W|$)", "i");
var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;
var POSTFIX_GROUP = 3;
var ENWeekdayParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ENWeekdayParser() {
    _classCallCheck(this, ENWeekdayParser);
    return _callSuper(this, ENWeekdayParser, arguments);
  }
  _inherits(ENWeekdayParser, _AbstractParserWithWo);
  return _createClass(ENWeekdayParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var prefix = match[PREFIX_GROUP];
      var postfix = match[POSTFIX_GROUP];
      var modifierWord = prefix || postfix;
      modifierWord = modifierWord || "";
      modifierWord = modifierWord.toLowerCase();
      var modifier = null;
      if (modifierWord == "last" || modifierWord == "past") {
        modifier = "last";
      } else if (modifierWord == "next") {
        modifier = "next";
      } else if (modifierWord == "this") {
        modifier = "this";
      }
      var weekday_word = match[WEEKDAY_GROUP].toLowerCase();
      var weekday;
      if (_constants.WEEKDAY_DICTIONARY[weekday_word] !== undefined) {
        weekday = _constants.WEEKDAY_DICTIONARY[weekday_word];
      } else if (weekday_word == "weekend") {
        weekday = modifier == "last" ? _types.Weekday.SUNDAY : _types.Weekday.SATURDAY;
      } else if (weekday_word == "weekday") {
        var refWeekday = context.reference.getDateWithAdjustedTimezone().getDay();
        if (refWeekday == _types.Weekday.SUNDAY || refWeekday == _types.Weekday.SATURDAY) {
          weekday = modifier == "last" ? _types.Weekday.FRIDAY : _types.Weekday.MONDAY;
        } else {
          weekday = refWeekday - 1;
          weekday = modifier == "last" ? weekday - 1 : weekday + 1;
          weekday = weekday % 5 + 1;
        }
      } else {
        return null;
      }
      return (0, _weekdays.createParsingComponentsAtWeekday)(context.reference, weekday, modifier);
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);