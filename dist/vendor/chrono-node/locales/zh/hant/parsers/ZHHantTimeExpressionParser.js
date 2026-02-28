"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../../common/parsers/AbstractParserWithWordBoundary.js");
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
var FIRST_REG_PATTERN = new RegExp("(?:由|從|自)?" + "(?:" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" + "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" + "(?:[\\s,，]*)" + "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?" + ")?" + "(?:[\\s,，]*)" + "(?:(\\d+|[" + Object.keys(_constants.NUMBER).join("") + "]+)(?:\\s*)(?:點|時|:|：)" + "(?:\\s*)" + "(\\d+|半|正|整|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?" + "(?:\\s*)" + "(\\d+|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)" + "(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
var SECOND_REG_PATTERN = new RegExp("(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)" + "(?:" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" + "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" + "(?:[\\s,，]*)" + "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?" + ")?" + "(?:[\\s,，]*)" + "(?:(\\d+|[" + Object.keys(_constants.NUMBER).join("") + "]+)(?:\\s*)(?:點|時|:|：)" + "(?:\\s*)" + "(\\d+|半|正|整|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?" + "(?:\\s*)" + "(\\d+|[" + Object.keys(_constants.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)" + "(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
var DAY_GROUP_1 = 1;
var ZH_AM_PM_HOUR_GROUP_1 = 2;
var ZH_AM_PM_HOUR_GROUP_2 = 3;
var DAY_GROUP_3 = 4;
var ZH_AM_PM_HOUR_GROUP_3 = 5;
var HOUR_GROUP = 6;
var MINUTE_GROUP = 7;
var SECOND_GROUP = 8;
var AM_PM_HOUR_GROUP = 9;
var ZHHantTimeExpressionParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ZHHantTimeExpressionParser() {
    _classCallCheck(this, ZHHantTimeExpressionParser);
    return _callSuper(this, ZHHantTimeExpressionParser, arguments);
  }
  _inherits(ZHHantTimeExpressionParser, _AbstractParserWithWo);
  return _createClass(ZHHantTimeExpressionParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return FIRST_REG_PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
        return null;
      }
      var result = context.createParsingResult(match.index, match[0]);
      var startMoment = new Date(context.refDate.getTime());
      if (match[DAY_GROUP_1]) {
        var day1 = match[DAY_GROUP_1];
        if (day1 == "明" || day1 == "聽") {
          if (context.refDate.getHours() > 1) {
            startMoment.setDate(startMoment.getDate() + 1);
          }
        } else if (day1 == "昨" || day1 == "尋" || day1 == "琴") {
          startMoment.setDate(startMoment.getDate() - 1);
        } else if (day1 == "前") {
          startMoment.setDate(startMoment.getDate() - 2);
        } else if (day1 == "大前") {
          startMoment.setDate(startMoment.getDate() - 3);
        } else if (day1 == "後") {
          startMoment.setDate(startMoment.getDate() + 2);
        } else if (day1 == "大後") {
          startMoment.setDate(startMoment.getDate() + 3);
        }
        result.start.assign("day", startMoment.getDate());
        result.start.assign("month", startMoment.getMonth() + 1);
        result.start.assign("year", startMoment.getFullYear());
      } else if (match[DAY_GROUP_3]) {
        var day3 = match[DAY_GROUP_3];
        if (day3 == "明" || day3 == "聽") {
          startMoment.setDate(startMoment.getDate() + 1);
        } else if (day3 == "昨" || day3 == "尋" || day3 == "琴") {
          startMoment.setDate(startMoment.getDate() - 1);
        } else if (day3 == "前") {
          startMoment.setDate(startMoment.getDate() - 2);
        } else if (day3 == "大前") {
          startMoment.setDate(startMoment.getDate() - 3);
        } else if (day3 == "後") {
          startMoment.setDate(startMoment.getDate() + 2);
        } else if (day3 == "大後") {
          startMoment.setDate(startMoment.getDate() + 3);
        }
        result.start.assign("day", startMoment.getDate());
        result.start.assign("month", startMoment.getMonth() + 1);
        result.start.assign("year", startMoment.getFullYear());
      } else {
        result.start.imply("day", startMoment.getDate());
        result.start.imply("month", startMoment.getMonth() + 1);
        result.start.imply("year", startMoment.getFullYear());
      }
      var hour = 0;
      var minute = 0;
      var meridiem = -1;
      if (match[SECOND_GROUP]) {
        var second = parseInt(match[SECOND_GROUP]);
        if (isNaN(second)) {
          second = (0, _constants.zhStringToNumber)(match[SECOND_GROUP]);
        }
        if (second >= 60) return null;
        result.start.assign("second", second);
      }
      hour = parseInt(match[HOUR_GROUP]);
      if (isNaN(hour)) {
        hour = (0, _constants.zhStringToNumber)(match[HOUR_GROUP]);
      }
      if (match[MINUTE_GROUP]) {
        if (match[MINUTE_GROUP] == "半") {
          minute = 30;
        } else if (match[MINUTE_GROUP] == "正" || match[MINUTE_GROUP] == "整") {
          minute = 0;
        } else {
          minute = parseInt(match[MINUTE_GROUP]);
          if (isNaN(minute)) {
            minute = (0, _constants.zhStringToNumber)(match[MINUTE_GROUP]);
          }
        }
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (minute >= 60) {
        return null;
      }
      if (hour > 24) {
        return null;
      }
      if (hour >= 12) {
        meridiem = 1;
      }
      if (match[AM_PM_HOUR_GROUP]) {
        if (hour > 12) return null;
        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        }
        if (ampm == "p") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
        var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
        var zhAMPM1 = zhAMPMString1[0];
        if (zhAMPM1 == "朝" || zhAMPM1 == "早") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM1 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
        var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
        var zhAMPM2 = zhAMPMString2[0];
        if (zhAMPM2 == "上" || zhAMPM2 == "朝" || zhAMPM2 == "早" || zhAMPM2 == "凌") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM2 == "下" || zhAMPM2 == "晏" || zhAMPM2 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
        var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
        var zhAMPM3 = zhAMPMString3[0];
        if (zhAMPM3 == "上" || zhAMPM3 == "朝" || zhAMPM3 == "早" || zhAMPM3 == "凌") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM3 == "下" || zhAMPM3 == "晏" || zhAMPM3 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      }
      result.start.assign("hour", hour);
      result.start.assign("minute", minute);
      if (meridiem >= 0) {
        result.start.assign("meridiem", meridiem);
      } else {
        if (hour < 12) {
          result.start.imply("meridiem", 0);
        } else {
          result.start.imply("meridiem", 1);
        }
      }
      var secondMatch = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
      if (!secondMatch) {
        if (result.text.match(/^\d+$/)) {
          return null;
        }
        return result;
      }
      var endMoment = new Date(startMoment.getTime());
      result.end = context.createParsingComponents();
      if (secondMatch[DAY_GROUP_1]) {
        var _day = secondMatch[DAY_GROUP_1];
        if (_day == "明" || _day == "聽") {
          if (context.refDate.getHours() > 1) {
            endMoment.setDate(endMoment.getDate() + 1);
          }
        } else if (_day == "昨" || _day == "尋" || _day == "琴") {
          endMoment.setDate(endMoment.getDate() - 1);
        } else if (_day == "前") {
          endMoment.setDate(endMoment.getDate() - 2);
        } else if (_day == "大前") {
          endMoment.setDate(endMoment.getDate() - 3);
        } else if (_day == "後") {
          endMoment.setDate(endMoment.getDate() + 2);
        } else if (_day == "大後") {
          endMoment.setDate(endMoment.getDate() + 3);
        }
        result.end.assign("day", endMoment.getDate());
        result.end.assign("month", endMoment.getMonth() + 1);
        result.end.assign("year", endMoment.getFullYear());
      } else if (secondMatch[DAY_GROUP_3]) {
        var _day2 = secondMatch[DAY_GROUP_3];
        if (_day2 == "明" || _day2 == "聽") {
          endMoment.setDate(endMoment.getDate() + 1);
        } else if (_day2 == "昨" || _day2 == "尋" || _day2 == "琴") {
          endMoment.setDate(endMoment.getDate() - 1);
        } else if (_day2 == "前") {
          endMoment.setDate(endMoment.getDate() - 2);
        } else if (_day2 == "大前") {
          endMoment.setDate(endMoment.getDate() - 3);
        } else if (_day2 == "後") {
          endMoment.setDate(endMoment.getDate() + 2);
        } else if (_day2 == "大後") {
          endMoment.setDate(endMoment.getDate() + 3);
        }
        result.end.assign("day", endMoment.getDate());
        result.end.assign("month", endMoment.getMonth() + 1);
        result.end.assign("year", endMoment.getFullYear());
      } else {
        result.end.imply("day", endMoment.getDate());
        result.end.imply("month", endMoment.getMonth() + 1);
        result.end.imply("year", endMoment.getFullYear());
      }
      hour = 0;
      minute = 0;
      meridiem = -1;
      if (secondMatch[SECOND_GROUP]) {
        var _second = parseInt(secondMatch[SECOND_GROUP]);
        if (isNaN(_second)) {
          _second = (0, _constants.zhStringToNumber)(secondMatch[SECOND_GROUP]);
        }
        if (_second >= 60) return null;
        result.end.assign("second", _second);
      }
      hour = parseInt(secondMatch[HOUR_GROUP]);
      if (isNaN(hour)) {
        hour = (0, _constants.zhStringToNumber)(secondMatch[HOUR_GROUP]);
      }
      if (secondMatch[MINUTE_GROUP]) {
        if (secondMatch[MINUTE_GROUP] == "半") {
          minute = 30;
        } else if (secondMatch[MINUTE_GROUP] == "正" || secondMatch[MINUTE_GROUP] == "整") {
          minute = 0;
        } else {
          minute = parseInt(secondMatch[MINUTE_GROUP]);
          if (isNaN(minute)) {
            minute = (0, _constants.zhStringToNumber)(secondMatch[MINUTE_GROUP]);
          }
        }
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (minute >= 60) {
        return null;
      }
      if (hour > 24) {
        return null;
      }
      if (hour >= 12) {
        meridiem = 1;
      }
      if (secondMatch[AM_PM_HOUR_GROUP]) {
        if (hour > 12) return null;
        var ampm = secondMatch[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        }
        if (ampm == "p") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
        if (!result.start.isCertain("meridiem")) {
          if (meridiem == 0) {
            result.start.imply("meridiem", 0);
            if (result.start.get("hour") == 12) {
              result.start.assign("hour", 0);
            }
          } else {
            result.start.imply("meridiem", 1);
            if (result.start.get("hour") != 12) {
              result.start.assign("hour", result.start.get("hour") + 12);
            }
          }
        }
      } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_1]) {
        var _zhAMPMString = secondMatch[ZH_AM_PM_HOUR_GROUP_1];
        var zhAMPM1 = _zhAMPMString[0];
        if (zhAMPM1 == "朝" || zhAMPM1 == "早") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM1 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_2]) {
        var _zhAMPMString2 = secondMatch[ZH_AM_PM_HOUR_GROUP_2];
        var zhAMPM2 = _zhAMPMString2[0];
        if (zhAMPM2 == "上" || zhAMPM2 == "朝" || zhAMPM2 == "早" || zhAMPM2 == "凌") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM2 == "下" || zhAMPM2 == "晏" || zhAMPM2 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_3]) {
        var _zhAMPMString3 = secondMatch[ZH_AM_PM_HOUR_GROUP_3];
        var zhAMPM3 = _zhAMPMString3[0];
        if (zhAMPM3 == "上" || zhAMPM3 == "朝" || zhAMPM3 == "早" || zhAMPM3 == "凌") {
          meridiem = 0;
          if (hour == 12) hour = 0;
        } else if (zhAMPM3 == "下" || zhAMPM3 == "晏" || zhAMPM3 == "晚") {
          meridiem = 1;
          if (hour != 12) hour += 12;
        }
      }
      result.text = result.text + secondMatch[0];
      result.end.assign("hour", hour);
      result.end.assign("minute", minute);
      if (meridiem >= 0) {
        result.end.assign("meridiem", meridiem);
      } else {
        var startAtPM = result.start.isCertain("meridiem") && result.start.get("meridiem") == 1;
        if (startAtPM && result.start.get("hour") > hour) {
          result.end.imply("meridiem", 0);
        } else if (hour > 12) {
          result.end.imply("meridiem", 1);
        }
      }
      if (result.end.date().getTime() < result.start.date().getTime()) {
        result.end.imply("day", result.end.get("day") + 1);
      }
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);