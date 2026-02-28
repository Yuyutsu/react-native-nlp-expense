"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _years = require("../../../calculation/years.js");
var _constants = require("../constants.js");
var _pattern = require("../../../utils/pattern.js");
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
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
var PATTERN = new RegExp("([0-9]{1,2})(?:\xBA|\xAA|\xB0)?" + "(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*" + "(?:-|/|\\s*(?:de|,)?\\s*)" + "(".concat((0, _pattern.matchAnyPattern)(_constants.MONTH_DICTIONARY), ")") + "(?:\\s*(?:de|,)?\\s*(".concat(_constants.YEAR_PATTERN, "))?") + "(?=\\W|$)", "i");
var DATE_GROUP = 1;
var DATE_TO_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var YEAR_GROUP = 4;
var ESMonthNameLittleEndianParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ESMonthNameLittleEndianParser() {
    _classCallCheck(this, ESMonthNameLittleEndianParser);
    return _callSuper(this, ESMonthNameLittleEndianParser, arguments);
  }
  _inherits(ESMonthNameLittleEndianParser, _AbstractParserWithWo);
  return _createClass(ESMonthNameLittleEndianParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var result = context.createParsingResult(match.index, match[0]);
      var month = _constants.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
      var day = parseInt(match[DATE_GROUP]);
      if (day > 31) {
        match.index = match.index + match[DATE_GROUP].length;
        return null;
      }
      result.start.assign("month", month);
      result.start.assign("day", day);
      if (match[YEAR_GROUP]) {
        var yearNumber = (0, _constants.parseYear)(match[YEAR_GROUP]);
        result.start.assign("year", yearNumber);
      } else {
        var year = (0, _years.findYearClosestToRef)(context.refDate, day, month);
        result.start.imply("year", year);
      }
      if (match[DATE_TO_GROUP]) {
        var endDate = parseInt(match[DATE_TO_GROUP]);
        result.end = result.start.clone();
        result.end.assign("day", endDate);
      }
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);