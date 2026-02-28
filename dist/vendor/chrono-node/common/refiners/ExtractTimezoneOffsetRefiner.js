"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i");
var TIMEZONE_OFFSET_SIGN_GROUP = 1;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 2;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 3;
var ExtractTimezoneOffsetRefiner = exports["default"] = /*#__PURE__*/function () {
  function ExtractTimezoneOffsetRefiner() {
    _classCallCheck(this, ExtractTimezoneOffsetRefiner);
  }
  return _createClass(ExtractTimezoneOffsetRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      results.forEach(function (result) {
        if (result.start.isCertain("timezoneOffset")) {
          return;
        }
        var suffix = context.text.substring(result.index + result.text.length);
        var match = TIMEZONE_OFFSET_PATTERN.exec(suffix);
        if (!match) {
          return;
        }
        context.debug(function () {
          console.log("Extracting timezone: '".concat(match[0], "' into : ").concat(result));
        });
        var hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
        var minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP] || "0");
        var timezoneOffset = hourOffset * 60 + minuteOffset;
        if (timezoneOffset > 14 * 60) {
          return;
        }
        if (match[TIMEZONE_OFFSET_SIGN_GROUP] === "-") {
          timezoneOffset = -timezoneOffset;
        }
        if (result.end != null) {
          result.end.assign("timezoneOffset", timezoneOffset);
        }
        result.start.assign("timezoneOffset", timezoneOffset);
        result.text += match[0];
      });
      return results;
    }
  }]);
}();