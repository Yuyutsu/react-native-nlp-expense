"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _types = require("../../../types.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:[àa])\\s*)?" + "(\\d{1,2})(?:h|:)?" + "(?:(\\d{1,2})(?:m|:)?)?" + "(?:(\\d{1,2})(?:s|:)?)?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", "i");
var SECOND_REG_PATTERN = new RegExp("^\\s*(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" + "(\\d{1,2})(?:h|:)?" + "(?:(\\d{1,2})(?:m|:)?)?" + "(?:(\\d{1,2})(?:s|:)?)?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", "i");
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;
var FRSpecificTimeExpressionParser = exports["default"] = /*#__PURE__*/function () {
  function FRSpecificTimeExpressionParser() {
    _classCallCheck(this, FRSpecificTimeExpressionParser);
  }
  return _createClass(FRSpecificTimeExpressionParser, [{
    key: "pattern",
    value: function pattern(context) {
      return FIRST_REG_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));
      if (result.text.match(/^\d{4}$/)) {
        match.index += match[0].length;
        return null;
      }
      result.start = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), match);
      if (!result.start) {
        match.index += match[0].length;
        return null;
      }
      var remainingText = context.text.substring(match.index + match[0].length);
      var secondMatch = SECOND_REG_PATTERN.exec(remainingText);
      if (secondMatch) {
        result.end = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), secondMatch);
        if (result.end) {
          result.text += secondMatch[0];
        }
      }
      return result;
    }
  }], [{
    key: "extractTimeComponent",
    value: function extractTimeComponent(extractingComponents, match) {
      var hour = 0;
      var minute = 0;
      var meridiem = null;
      hour = parseInt(match[HOUR_GROUP]);
      if (match[MINUTE_GROUP] != null) {
        minute = parseInt(match[MINUTE_GROUP]);
      }
      if (minute >= 60 || hour > 24) {
        return null;
      }
      if (hour >= 12) {
        meridiem = _types.Meridiem.PM;
      }
      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) return null;
        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = _types.Meridiem.AM;
          if (hour == 12) {
            hour = 0;
          }
        }
        if (ampm == "p") {
          meridiem = _types.Meridiem.PM;
          if (hour != 12) {
            hour += 12;
          }
        }
      }
      extractingComponents.assign("hour", hour);
      extractingComponents.assign("minute", minute);
      if (meridiem !== null) {
        extractingComponents.assign("meridiem", meridiem);
      } else {
        if (hour < 12) {
          extractingComponents.imply("meridiem", _types.Meridiem.AM);
        } else {
          extractingComponents.imply("meridiem", _types.Meridiem.PM);
        }
      }
      if (match[SECOND_GROUP] != null) {
        var second = parseInt(match[SECOND_GROUP]);
        if (second >= 60) return null;
        extractingComponents.assign("second", second);
      }
      return extractingComponents;
    }
  }]);
}();