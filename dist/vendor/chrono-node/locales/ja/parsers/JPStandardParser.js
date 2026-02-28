"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _years = require("../../../calculation/years.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PATTERN = /(?:(?:([同今本])|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
var SPECIAL_YEAR_GROUP = 1;
var TYPICAL_YEAR_GROUP = 2;
var ERA_GROUP = 3;
var YEAR_NUMBER_GROUP = 4;
var MONTH_GROUP = 5;
var DAY_GROUP = 6;
var JPStandardParser = exports["default"] = /*#__PURE__*/function () {
  function JPStandardParser() {
    _classCallCheck(this, JPStandardParser);
  }
  return _createClass(JPStandardParser, [{
    key: "pattern",
    value: function pattern() {
      return PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var month = parseInt((0, _constants.toHankaku)(match[MONTH_GROUP]));
      var day = parseInt((0, _constants.toHankaku)(match[DAY_GROUP]));
      var components = context.createParsingComponents({
        day: day,
        month: month
      });
      if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match("同|今|本")) {
        components.assign("year", context.reference.getDateWithAdjustedTimezone().getFullYear());
      }
      if (match[TYPICAL_YEAR_GROUP]) {
        var yearNumText = match[YEAR_NUMBER_GROUP];
        var year = yearNumText == "元" ? 1 : parseInt((0, _constants.toHankaku)(yearNumText));
        if (match[ERA_GROUP] == "令和") {
          year += 2018;
        } else if (match[ERA_GROUP] == "平成") {
          year += 1988;
        } else if (match[ERA_GROUP] == "昭和") {
          year += 1925;
        }
        components.assign("year", year);
      } else {
        var _year = (0, _years.findYearClosestToRef)(context.refDate, day, month);
        components.imply("year", _year);
      }
      return components;
    }
  }]);
}();