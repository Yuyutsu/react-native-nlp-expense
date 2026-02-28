"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _timezone = require("../../timezone.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
var ExtractTimezoneAbbrRefiner = exports["default"] = /*#__PURE__*/function () {
  function ExtractTimezoneAbbrRefiner(timezoneOverrides) {
    _classCallCheck(this, ExtractTimezoneAbbrRefiner);
    _defineProperty(this, "timezoneOverrides", void 0);
    this.timezoneOverrides = timezoneOverrides;
  }
  return _createClass(ExtractTimezoneAbbrRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var _context$option$timez,
        _this = this;
      var timezoneOverrides = (_context$option$timez = context.option.timezones) !== null && _context$option$timez !== void 0 ? _context$option$timez : {};
      results.forEach(function (result) {
        var _ref, _result$start$date;
        var suffix = context.text.substring(result.index + result.text.length);
        var match = TIMEZONE_NAME_PATTERN.exec(suffix);
        if (!match) {
          return;
        }
        var timezoneAbbr = match[1].toUpperCase();
        var refDate = (_ref = (_result$start$date = result.start.date()) !== null && _result$start$date !== void 0 ? _result$start$date : result.refDate) !== null && _ref !== void 0 ? _ref : new Date();
        var tzOverrides = _objectSpread(_objectSpread({}, _this.timezoneOverrides), timezoneOverrides);
        var extractedTimezoneOffset = (0, _timezone.toTimezoneOffset)(timezoneAbbr, refDate, tzOverrides);
        if (extractedTimezoneOffset == null) {
          return;
        }
        context.debug(function () {
          console.log("Extracting timezone: '".concat(timezoneAbbr, "' into: ").concat(extractedTimezoneOffset, " for: ").concat(result.start));
        });
        var currentTimezoneOffset = result.start.get("timezoneOffset");
        if (currentTimezoneOffset !== null && extractedTimezoneOffset != currentTimezoneOffset) {
          if (result.start.isCertain("timezoneOffset")) {
            return;
          }
          if (timezoneAbbr != match[1]) {
            return;
          }
        }
        if (result.start.isOnlyDate()) {
          if (timezoneAbbr != match[1]) {
            return;
          }
        }
        result.text += match[0];
        if (!result.start.isCertain("timezoneOffset")) {
          result.start.assign("timezoneOffset", extractedTimezoneOffset);
        }
        if (result.end != null && !result.end.isCertain("timezoneOffset")) {
          result.end.assign("timezoneOffset", extractedTimezoneOffset);
        }
      });
      return results;
    }
  }]);
}();