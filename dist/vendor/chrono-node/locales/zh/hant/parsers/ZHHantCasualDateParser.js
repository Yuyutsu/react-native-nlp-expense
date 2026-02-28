"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../../common/parsers/AbstractParserWithWordBoundary.js");
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
var NOW_GROUP = 1;
var DAY_GROUP_1 = 2;
var TIME_GROUP_1 = 3;
var TIME_GROUP_2 = 4;
var DAY_GROUP_3 = 5;
var TIME_GROUP_3 = 6;
var ZHHantCasualDateParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ZHHantCasualDateParser() {
    _classCallCheck(this, ZHHantCasualDateParser);
    return _callSuper(this, ZHHantCasualDateParser, arguments);
  }
  _inherits(ZHHantCasualDateParser, _AbstractParserWithWo);
  return _createClass(ZHHantCasualDateParser, [{
    key: "innerPattern",
    value: function innerPattern(context) {
      return new RegExp("(而家|立(?:刻|即)|即刻)|" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" + "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" + "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" + "(?:[\\s|,|，]*)" + "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?", "i");
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var index = match.index;
      var result = context.createParsingResult(index, match[0]);
      var refDate = context.refDate;
      var date = new Date(refDate.getTime());
      if (match[NOW_GROUP]) {
        result.start.imply("hour", refDate.getHours());
        result.start.imply("minute", refDate.getMinutes());
        result.start.imply("second", refDate.getSeconds());
        result.start.imply("millisecond", refDate.getMilliseconds());
      } else if (match[DAY_GROUP_1]) {
        var day1 = match[DAY_GROUP_1];
        var time1 = match[TIME_GROUP_1];
        if (day1 == "明" || day1 == "聽") {
          if (refDate.getHours() > 1) {
            date.setDate(date.getDate() + 1);
          }
        } else if (day1 == "昨" || day1 == "尋" || day1 == "琴") {
          date.setDate(date.getDate() - 1);
        } else if (day1 == "前") {
          date.setDate(date.getDate() - 2);
        } else if (day1 == "大前") {
          date.setDate(date.getDate() - 3);
        } else if (day1 == "後") {
          date.setDate(date.getDate() + 2);
        } else if (day1 == "大後") {
          date.setDate(date.getDate() + 3);
        }
        if (time1 == "早" || time1 == "朝") {
          result.start.imply("hour", 6);
        } else if (time1 == "晚") {
          result.start.imply("hour", 22);
          result.start.imply("meridiem", 1);
        }
      } else if (match[TIME_GROUP_2]) {
        var timeString2 = match[TIME_GROUP_2];
        var time2 = timeString2[0];
        if (time2 == "早" || time2 == "朝" || time2 == "上") {
          result.start.imply("hour", 6);
        } else if (time2 == "下" || time2 == "晏") {
          result.start.imply("hour", 15);
          result.start.imply("meridiem", 1);
        } else if (time2 == "中") {
          result.start.imply("hour", 12);
          result.start.imply("meridiem", 1);
        } else if (time2 == "夜" || time2 == "晚") {
          result.start.imply("hour", 22);
          result.start.imply("meridiem", 1);
        } else if (time2 == "凌") {
          result.start.imply("hour", 0);
        }
      } else if (match[DAY_GROUP_3]) {
        var day3 = match[DAY_GROUP_3];
        if (day3 == "明" || day3 == "聽") {
          if (refDate.getHours() > 1) {
            date.setDate(date.getDate() + 1);
          }
        } else if (day3 == "昨" || day3 == "尋" || day3 == "琴") {
          date.setDate(date.getDate() - 1);
        } else if (day3 == "前") {
          date.setDate(date.getDate() - 2);
        } else if (day3 == "大前") {
          date.setDate(date.getDate() - 3);
        } else if (day3 == "後") {
          date.setDate(date.getDate() + 2);
        } else if (day3 == "大後") {
          date.setDate(date.getDate() + 3);
        }
        var timeString3 = match[TIME_GROUP_3];
        if (timeString3) {
          var time3 = timeString3[0];
          if (time3 == "早" || time3 == "朝" || time3 == "上") {
            result.start.imply("hour", 6);
          } else if (time3 == "下" || time3 == "晏") {
            result.start.imply("hour", 15);
            result.start.imply("meridiem", 1);
          } else if (time3 == "中") {
            result.start.imply("hour", 12);
            result.start.imply("meridiem", 1);
          } else if (time3 == "夜" || time3 == "晚") {
            result.start.imply("hour", 22);
            result.start.imply("meridiem", 1);
          } else if (time3 == "凌") {
            result.start.imply("hour", 0);
          }
        }
      }
      result.start.assign("day", date.getDate());
      result.start.assign("month", date.getMonth() + 1);
      result.start.assign("year", date.getFullYear());
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);