"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _years = require("../../../calculation/years.js");
var _constants = require("../constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PATTERN = new RegExp("([0-9０-９]{4}[\\/|\\／])?" + "([0-1０-１]{0,1}[0-9０-９]{1})(?:[\\/|\\／]([0-3０-３]{0,1}[0-9０-９]{1}))", "i");
var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;
var JPSlashDateFormatParser = exports["default"] = /*#__PURE__*/function () {
  function JPSlashDateFormatParser() {
    _classCallCheck(this, JPSlashDateFormatParser);
  }
  return _createClass(JPSlashDateFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var result = context.createParsingComponents();
      var month = parseInt((0, _constants.toHankaku)(match[MONTH_GROUP]));
      var day = parseInt((0, _constants.toHankaku)(match[DAY_GROUP]));
      if (month < 1 || month > 12) {
        return null;
      }
      if (day < 1 || day > 31) {
        return null;
      }
      result.assign("day", day);
      result.assign("month", month);
      if (match[YEAR_GROUP]) {
        var rawYearNumber = parseInt((0, _constants.toHankaku)(match[YEAR_GROUP]));
        var year = (0, _years.findMostLikelyADYear)(rawYearNumber);
        result.assign("year", year);
      } else {
        var _year = (0, _years.findYearClosestToRef)(context.reference.instant, day, month);
        result.imply("year", _year);
      }
      return result;
    }
  }]);
}();