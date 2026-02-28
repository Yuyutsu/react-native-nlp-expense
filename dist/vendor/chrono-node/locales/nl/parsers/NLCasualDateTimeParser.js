"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
var _types = require("../../../types.js");
var _dates = require("../../../utils/dates.js");
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
var DATE_GROUP = 1;
var TIME_OF_DAY_GROUP = 2;
var NLCasualDateTimeParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function NLCasualDateTimeParser() {
    _classCallCheck(this, NLCasualDateTimeParser);
    return _callSuper(this, NLCasualDateTimeParser, arguments);
  }
  _inherits(NLCasualDateTimeParser, _AbstractParserWithWo);
  return _createClass(NLCasualDateTimeParser, [{
    key: "innerPattern",
    value: function innerPattern(context) {
      return /(gisteren|morgen|van)(ochtend|middag|namiddag|avond|nacht)(?=\W|$)/i;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var dateText = match[DATE_GROUP].toLowerCase();
      var timeText = match[TIME_OF_DAY_GROUP].toLowerCase();
      var component = context.createParsingComponents();
      var targetDate = context.refDate;
      switch (dateText) {
        case "gisteren":
          var previousDay = new Date(targetDate.getTime());
          previousDay.setDate(previousDay.getDate() - 1);
          (0, _dates.assignSimilarDate)(component, previousDay);
          break;
        case "van":
          (0, _dates.assignSimilarDate)(component, targetDate);
          break;
        case "morgen":
          var nextDay = new Date(targetDate.getTime());
          nextDay.setDate(nextDay.getDate() + 1);
          (0, _dates.assignSimilarDate)(component, nextDay);
          (0, _dates.implySimilarTime)(component, nextDay);
          break;
      }
      switch (timeText) {
        case "ochtend":
          component.imply("meridiem", _types.Meridiem.AM);
          component.imply("hour", 6);
          break;
        case "middag":
          component.imply("meridiem", _types.Meridiem.AM);
          component.imply("hour", 12);
          break;
        case "namiddag":
          component.imply("meridiem", _types.Meridiem.PM);
          component.imply("hour", 15);
          break;
        case "avond":
          component.imply("meridiem", _types.Meridiem.PM);
          component.imply("hour", 20);
          break;
      }
      return component;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);