"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _pattern = require("../../../utils/pattern.js");
var _weekdays = require("../../../calculation/weekdays.js");
var _AbstractParserWithWordBoundaryChecking = require("./AbstractParserWithWordBoundaryChecking.js");
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
var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;
var POSTFIX_GROUP = 3;
var UKWeekdayParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithLe) {
  function UKWeekdayParser() {
    _classCallCheck(this, UKWeekdayParser);
    return _callSuper(this, UKWeekdayParser, arguments);
  }
  _inherits(UKWeekdayParser, _AbstractParserWithLe);
  return _createClass(UKWeekdayParser, [{
    key: "innerPatternString",
    value: function innerPatternString(context) {
      return "(?:(?:,|\\(|\uFF08)\\s*)?" + "(?:\u0432\\s*?)?" + "(?:\u0443\\s*?)?" + "(?:(\u0446\u0435\u0439|\u043C\u0438\u043D\u0443\u043B\u043E\u0433\u043E|\u043C\u0438\u043D\u0443\u043B\u0438\u0439|\u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439|\u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u0433\u043E|\u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u0433\u043E|\u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439|\u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u043C\u0443)\\s*)?" + "(".concat((0, _pattern.matchAnyPattern)(_constants.WEEKDAY_DICTIONARY), ")") + "(?:\\s*(?:,|\\)|\uFF09))?" + "(?:\\s*(\u043D\u0430|\u0443|\u0432)\\s*(\u0446\u044C\u043E\u043C\u0443|\u043C\u0438\u043D\u0443\u043B\u043E\u043C\u0443|\u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u043C\u0443)\\s*\u0442\u0438\u0436\u043D\u0456)?";
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var dayOfWeek = match[WEEKDAY_GROUP].toLocaleLowerCase();
      var weekday = _constants.WEEKDAY_DICTIONARY[dayOfWeek];
      var prefix = match[PREFIX_GROUP];
      var postfix = match[POSTFIX_GROUP];
      var modifierWord = prefix || postfix;
      modifierWord = modifierWord || "";
      modifierWord = modifierWord.toLocaleLowerCase();
      var modifier = null;
      if (modifierWord == "минулого" || modifierWord == "минулий" || modifierWord == "попередній" || modifierWord == "попереднього") {
        modifier = "last";
      } else if (modifierWord == "наступного" || modifierWord == "наступний") {
        modifier = "next";
      } else if (modifierWord == "цей" || modifierWord == "цього" || modifierWord == "цьому") {
        modifier = "this";
      }
      return (0, _weekdays.createParsingComponentsAtWeekday)(context.reference, weekday, modifier);
    }
  }]);
}(_AbstractParserWithWordBoundaryChecking.AbstractParserWithLeftRightBoundaryChecking);