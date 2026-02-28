"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("./AbstractParserWithWordBoundary.js");
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
var PATTERN = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})" + "(?:T" + "([0-9]{1,2}):([0-9]{1,2})" + "(?:" + ":([0-9]{1,2})(?:\\.(\\d{1,4}))?" + ")?" + "(" + "Z|([+-]\\d{2}):?(\\d{2})?" + ")?" + ")?" + "(?=\\W|$)", "i");
var YEAR_NUMBER_GROUP = 1;
var MONTH_NUMBER_GROUP = 2;
var DATE_NUMBER_GROUP = 3;
var HOUR_NUMBER_GROUP = 4;
var MINUTE_NUMBER_GROUP = 5;
var SECOND_NUMBER_GROUP = 6;
var MILLISECOND_NUMBER_GROUP = 7;
var TZD_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;
var ISOFormatParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ISOFormatParser() {
    _classCallCheck(this, ISOFormatParser);
    return _callSuper(this, ISOFormatParser, arguments);
  }
  _inherits(ISOFormatParser, _AbstractParserWithWo);
  return _createClass(ISOFormatParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var components = context.createParsingComponents({
        "year": parseInt(match[YEAR_NUMBER_GROUP]),
        "month": parseInt(match[MONTH_NUMBER_GROUP]),
        "day": parseInt(match[DATE_NUMBER_GROUP])
      });
      if (match[HOUR_NUMBER_GROUP] != null) {
        components.assign("hour", parseInt(match[HOUR_NUMBER_GROUP]));
        components.assign("minute", parseInt(match[MINUTE_NUMBER_GROUP]));
        if (match[SECOND_NUMBER_GROUP] != null) {
          components.assign("second", parseInt(match[SECOND_NUMBER_GROUP]));
        }
        if (match[MILLISECOND_NUMBER_GROUP] != null) {
          components.assign("millisecond", parseInt(match[MILLISECOND_NUMBER_GROUP]));
        }
        if (match[TZD_GROUP] != null) {
          var offset = 0;
          if (match[TZD_HOUR_OFFSET_GROUP]) {
            var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
            var minuteOffset = 0;
            if (match[TZD_MINUTE_OFFSET_GROUP] != null) {
              minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
            }
            offset = hourOffset * 60;
            if (offset < 0) {
              offset -= minuteOffset;
            } else {
              offset += minuteOffset;
            }
          }
          components.assign("timezoneOffset", offset);
        }
      }
      return components.addTag("parser/ISOFormatParser");
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);