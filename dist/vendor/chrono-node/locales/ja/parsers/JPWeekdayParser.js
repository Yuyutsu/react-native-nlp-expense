"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _weekdays = require("../../../calculation/weekdays.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PATTERN = new RegExp("((?<prefix>前の|次の|今週))?(?<weekday>" + Object.keys(_constants.WEEKDAY_OFFSET).join("|") + ")(?:曜日|曜)", "i");
var JPWeekdayParser = exports["default"] = /*#__PURE__*/function () {
  function JPWeekdayParser() {
    _classCallCheck(this, JPWeekdayParser);
  }
  return _createClass(JPWeekdayParser, [{
    key: "pattern",
    value: function pattern() {
      return PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var dayOfWeek = match.groups.weekday;
      var offset = _constants.WEEKDAY_OFFSET[dayOfWeek];
      if (offset === undefined) return null;
      var prefix = match.groups.prefix || "";
      var modifier = null;
      if (prefix.match(/前の/)) {
        modifier = "last";
      } else if (prefix.match(/次の/)) {
        modifier = "next";
      } else if (prefix.match(/今週/)) {
        modifier = "this";
      }
      return (0, _weekdays.createParsingComponentsAtWeekday)(context.reference, offset, modifier);
    }
  }]);
}();