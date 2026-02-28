"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../../common/parsers/AbstractParserWithWordBoundary.js");
var _constants = require("../constants.js");
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
var PATTERN = new RegExp("(?<prefix>上|今|下|這|呢)(?:個)?(?:星期|禮拜|週)(?<weekday>" + Object.keys(_constants.WEEKDAY_OFFSET).join("|") + ")");
var ZHHantRelationWeekdayParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ZHHantRelationWeekdayParser() {
    _classCallCheck(this, ZHHantRelationWeekdayParser);
    return _callSuper(this, ZHHantRelationWeekdayParser, arguments);
  }
  _inherits(ZHHantRelationWeekdayParser, _AbstractParserWithWo);
  return _createClass(ZHHantRelationWeekdayParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var result = context.createParsingResult(match.index, match[0]);
      var dayOfWeek = match.groups.weekday;
      var offset = _constants.WEEKDAY_OFFSET[dayOfWeek];
      if (offset === undefined) return null;
      var modifier = null;
      var prefix = match.groups.prefix;
      if (prefix == "上") {
        modifier = "last";
      } else if (prefix == "下") {
        modifier = "next";
      } else if (prefix == "今" || prefix == "這" || prefix == "呢") {
        modifier = "this";
      }
      var date = new Date(context.refDate.getTime());
      var startMomentFixed = false;
      var refOffset = date.getDay();
      if (modifier == "last" || modifier == "past") {
        date.setDate(date.getDate() + (offset - 7 - refOffset));
        startMomentFixed = true;
      } else if (modifier == "next") {
        date.setDate(date.getDate() + (offset + 7 - refOffset));
        startMomentFixed = true;
      } else if (modifier == "this") {
        date.setDate(date.getDate() + (offset - refOffset));
      } else {
        var diff = offset - refOffset;
        if (Math.abs(diff - 7) < Math.abs(diff)) {
          diff -= 7;
        }
        if (Math.abs(diff + 7) < Math.abs(diff)) {
          diff += 7;
        }
        date.setDate(date.getDate() + diff);
      }
      result.start.assign("weekday", offset);
      if (startMomentFixed) {
        result.start.assign("day", date.getDate());
        result.start.assign("month", date.getMonth() + 1);
        result.start.assign("year", date.getFullYear());
      } else {
        result.start.imply("day", date.getDate());
        result.start.imply("month", date.getMonth() + 1);
        result.start.imply("year", date.getFullYear());
      }
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);