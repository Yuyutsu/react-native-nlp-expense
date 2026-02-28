"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
var _types = require("../../../types.js");
var _constants = require("../constants.js");
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
var FIRST_REG_PATTERN = new RegExp("(?:" + "(午前|午後|A.M.|P.M.|AM|PM)" + ")?" + "(?:[\\s,，、]*)" + "(?:([0-9０-９]+|[" + Object.keys(_constants.NUMBER).join("") + "]+)(?:\\s*)(?:時(?!間)|:|：)" + "(?:\\s*)" + "([0-9０-９]+|半|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?" + "(?:\\s*)" + "([0-9０-９]+|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)" + "(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
var SECOND_REG_PATTERN = new RegExp("(?:^\\s*(?:から|\\-|\\–|\\－|\\~|\\〜)\\s*)" + "(?:" + "(午前|午後|A.M.|P.M.|AM|PM)" + ")?" + "(?:[\\s,，、]*)" + "(?:([0-9０-９]+|[" + Object.keys(_constants.NUMBER).join("") + "]+)(?:\\s*)(?:時|:|：)" + "(?:\\s*)" + "([0-9０-９]+|半|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?" + "(?:\\s*)" + "([0-9０-９]+|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)" + "(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
var AM_PM_HOUR_GROUP_1 = 1;
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP_2 = 5;
var JPTimeExpressionParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function JPTimeExpressionParser() {
    _classCallCheck(this, JPTimeExpressionParser);
    return _callSuper(this, JPTimeExpressionParser, arguments);
  }
  _inherits(JPTimeExpressionParser, _AbstractParserWithWo);
  return _createClass(JPTimeExpressionParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return FIRST_REG_PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var _match$AM_PM_HOUR_GRO, _match$AM_PM_HOUR_GRO2;
      if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
        return null;
      }
      var result = context.createParsingResult(match.index, match[0]);
      result.start = createTimeComponents(context, match[HOUR_GROUP], match[MINUTE_GROUP], match[SECOND_GROUP], (_match$AM_PM_HOUR_GRO = match[AM_PM_HOUR_GROUP_1]) !== null && _match$AM_PM_HOUR_GRO !== void 0 ? _match$AM_PM_HOUR_GRO : match[AM_PM_HOUR_GROUP_2]);
      if (!result.start) {
        match.index += match[0].length;
        return null;
      }
      match = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
      if (!match) {
        return result;
      }
      result.text = result.text + match[0];
      result.end = createTimeComponents(context, match[HOUR_GROUP], match[MINUTE_GROUP], match[SECOND_GROUP], (_match$AM_PM_HOUR_GRO2 = match[AM_PM_HOUR_GROUP_1]) !== null && _match$AM_PM_HOUR_GRO2 !== void 0 ? _match$AM_PM_HOUR_GRO2 : match[AM_PM_HOUR_GROUP_2]);
      if (!result.end) {
        return null;
      }
      if (!result.end.isCertain("meridiem") && result.start.isCertain("meridiem")) {
        result.end.imply("meridiem", result.start.get("meridiem"));
        if (result.start.get("meridiem") === _types.Meridiem.PM) {
          if (result.start.get("hour") - 12 > result.end.get("hour")) {
            result.end.imply("meridiem", _types.Meridiem.AM);
          } else if (result.end.get("hour") < 12) {
            result.end.assign("hour", result.end.get("hour") + 12);
          }
        }
      }
      if (result.end.date().getTime() < result.start.date().getTime()) {
        result.end.imply("day", result.end.get("day") + 1);
      }
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);
function createTimeComponents(context, matchHour, matchMinute, matchSecond, matchAmPm) {
  var hour = 0;
  var meridiem = -1;
  var targetComponents = context.createParsingComponents();
  hour = parseInt((0, _constants.toHankaku)(matchHour));
  if (isNaN(hour)) {
    hour = (0, _constants.jaStringToNumber)(matchHour);
  }
  if (hour > 24) {
    return null;
  }
  if (matchMinute) {
    var minute;
    if (matchMinute === "半") {
      minute = 30;
    } else {
      minute = parseInt((0, _constants.toHankaku)(matchMinute));
      if (isNaN(minute)) {
        minute = (0, _constants.jaStringToNumber)(matchMinute);
      }
    }
    if (minute >= 60) return null;
    targetComponents.assign("minute", minute);
  }
  if (matchSecond) {
    var second = parseInt((0, _constants.toHankaku)(matchSecond));
    if (isNaN(second)) {
      second = (0, _constants.jaStringToNumber)(matchSecond);
    }
    if (second >= 60) return null;
    targetComponents.assign("second", second);
  }
  if (matchAmPm) {
    if (hour > 12) {
      return null;
    }
    var AMPMString = matchAmPm;
    if (AMPMString === "午前" || AMPMString[0].toLowerCase() === "a") {
      meridiem = _types.Meridiem.AM;
      if (hour === 12) hour = 0;
    } else if (AMPMString === "午後" || AMPMString[0].toLowerCase() === "p") {
      meridiem = _types.Meridiem.PM;
      if (hour != 12) hour += 12;
    }
  }
  targetComponents.assign("hour", hour);
  if (meridiem >= 0) {
    targetComponents.assign("meridiem", meridiem);
  } else {
    if (hour < 12) {
      targetComponents.imply("meridiem", _types.Meridiem.AM);
    } else {
      targetComponents.imply("meridiem", _types.Meridiem.PM);
    }
  }
  return targetComponents;
}