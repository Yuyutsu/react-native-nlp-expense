"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants.js");
var _results = require("../../../results.js");
var _AbstractParserWithWordBoundary = require("../../../common/parsers/AbstractParserWithWordBoundary.js");
var _pattern = require("../../../utils/pattern.js");
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
var PATTERN = new RegExp("(dit|deze|(?:aan)?komend|volgend|afgelopen|vorig)e?\\s*(".concat((0, _pattern.matchAnyPattern)(_constants.TIME_UNIT_DICTIONARY), ")(?=\\s*)") + "(?=\\W|$)", "i");
var MODIFIER_WORD_GROUP = 1;
var RELATIVE_WORD_GROUP = 2;
var NLRelativeDateFormatParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function NLRelativeDateFormatParser() {
    _classCallCheck(this, NLRelativeDateFormatParser);
    return _callSuper(this, NLRelativeDateFormatParser, arguments);
  }
  _inherits(NLRelativeDateFormatParser, _AbstractParserWithWo);
  return _createClass(NLRelativeDateFormatParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
      var unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
      var timeunit = _constants.TIME_UNIT_DICTIONARY[unitWord];
      if (modifier == "volgend" || modifier == "komend" || modifier == "aankomend") {
        var timeUnits = {};
        timeUnits[timeunit] = 1;
        return _results.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
      if (modifier == "afgelopen" || modifier == "vorig") {
        var _timeUnits = {};
        _timeUnits[timeunit] = -1;
        return _results.ParsingComponents.createRelativeFromReference(context.reference, _timeUnits);
      }
      var components = context.createParsingComponents();
      var date = new Date(context.reference.instant.getTime());
      if (unitWord.match(/week/i)) {
        date.setDate(date.getDate() - date.getDay());
        components.imply("day", date.getDate());
        components.imply("month", date.getMonth() + 1);
        components.imply("year", date.getFullYear());
      } else if (unitWord.match(/maand/i)) {
        date.setDate(1);
        components.imply("day", date.getDate());
        components.assign("year", date.getFullYear());
        components.assign("month", date.getMonth() + 1);
      } else if (unitWord.match(/jaar/i)) {
        date.setDate(1);
        date.setMonth(0);
        components.imply("day", date.getDate());
        components.imply("month", date.getMonth() + 1);
        components.assign("year", date.getFullYear());
      }
      return components;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);