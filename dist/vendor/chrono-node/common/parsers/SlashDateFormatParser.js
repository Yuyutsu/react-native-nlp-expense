"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _years = require("../../calculation/years.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PATTERN = new RegExp("([^\\d]|^)" + "([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})" + "(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?" + "(\\W|$)", "i");
var OPENING_GROUP = 1;
var ENDING_GROUP = 5;
var FIRST_NUMBERS_GROUP = 2;
var SECOND_NUMBERS_GROUP = 3;
var YEAR_GROUP = 4;
var SlashDateFormatParser = exports["default"] = /*#__PURE__*/function () {
  function SlashDateFormatParser(littleEndian) {
    _classCallCheck(this, SlashDateFormatParser);
    _defineProperty(this, "groupNumberMonth", void 0);
    _defineProperty(this, "groupNumberDay", void 0);
    this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
    this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
  }
  return _createClass(SlashDateFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var index = match.index + match[OPENING_GROUP].length;
      var indexEnd = match.index + match[0].length - match[ENDING_GROUP].length;
      if (index > 0) {
        var textBefore = context.text.substring(0, index);
        if (textBefore.match("\\d/?$")) {
          return;
        }
      }
      if (indexEnd < context.text.length) {
        var textAfter = context.text.substring(indexEnd);
        if (textAfter.match("^/?\\d")) {
          return;
        }
      }
      var text = context.text.substring(index, indexEnd);
      if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
        return;
      }
      if (!match[YEAR_GROUP] && text.indexOf("/") < 0) {
        return;
      }
      var result = context.createParsingResult(index, text);
      var month = parseInt(match[this.groupNumberMonth]);
      var day = parseInt(match[this.groupNumberDay]);
      if (month < 1 || month > 12) {
        if (month > 12) {
          if (day >= 1 && day <= 12 && month <= 31) {
            var _ref = [month, day];
            day = _ref[0];
            month = _ref[1];
          } else {
            return null;
          }
        }
      }
      if (day < 1 || day > 31) {
        return null;
      }
      result.start.assign("day", day);
      result.start.assign("month", month);
      if (match[YEAR_GROUP]) {
        var rawYearNumber = parseInt(match[YEAR_GROUP]);
        var year = (0, _years.findMostLikelyADYear)(rawYearNumber);
        result.start.assign("year", year);
      } else {
        var _year = (0, _years.findYearClosestToRef)(context.refDate, day, month);
        result.start.imply("year", _year);
      }
      return result.addTag("parser/SlashDateFormatParser");
    }
  }]);
}();