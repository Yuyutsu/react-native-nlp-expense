"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AbstractParserWithWordBoundary = require("../../../../common/parsers/AbstractParserWithWordBoundary.js");
var _duration = require("../../../../calculation/duration.js");
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
var PATTERN = new RegExp("(\\d+|[" + Object.keys(_constants.NUMBER).join("") + "]+|半|幾)(?:\\s*)" + "(?:個)?" + "(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)" + "(?:(?:之|過)?後|(?:之)?內)", "i");
var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;
var ZHHantDeadlineFormatParser = exports["default"] = /*#__PURE__*/function (_AbstractParserWithWo) {
  function ZHHantDeadlineFormatParser() {
    _classCallCheck(this, ZHHantDeadlineFormatParser);
    return _callSuper(this, ZHHantDeadlineFormatParser, arguments);
  }
  _inherits(ZHHantDeadlineFormatParser, _AbstractParserWithWo);
  return _createClass(ZHHantDeadlineFormatParser, [{
    key: "innerPattern",
    value: function innerPattern() {
      return PATTERN;
    }
  }, {
    key: "innerExtract",
    value: function innerExtract(context, match) {
      var result = context.createParsingResult(match.index, match[0]);
      var number = parseInt(match[NUMBER_GROUP]);
      if (isNaN(number)) {
        number = (0, _constants.zhStringToNumber)(match[NUMBER_GROUP]);
      }
      if (isNaN(number)) {
        var string = match[NUMBER_GROUP];
        if (string === "幾") {
          number = 3;
        } else if (string === "半") {
          number = 0.5;
        } else {
          return null;
        }
      }
      var duration = {};
      var unit = match[UNIT_GROUP];
      var unitAbbr = unit[0];
      if (unitAbbr.match(/[日天星禮月年]/)) {
        if (unitAbbr == "日" || unitAbbr == "天") {
          duration.day = number;
        } else if (unitAbbr == "星" || unitAbbr == "禮") {
          duration.week = number;
        } else if (unitAbbr == "月") {
          duration.month = number;
        } else if (unitAbbr == "年") {
          duration.year = number;
        }
        var _date = (0, _duration.addDuration)(context.refDate, duration);
        result.start.assign("year", _date.getFullYear());
        result.start.assign("month", _date.getMonth() + 1);
        result.start.assign("day", _date.getDate());
        return result;
      }
      if (unitAbbr == "秒") {
        duration.second = number;
      } else if (unitAbbr == "分") {
        duration.minute = number;
      } else if (unitAbbr == "小" || unitAbbr == "鐘") {
        duration.hour = number;
      }
      var date = (0, _duration.addDuration)(context.refDate, duration);
      result.start.imply("year", date.getFullYear());
      result.start.imply("month", date.getMonth() + 1);
      result.start.imply("day", date.getDate());
      result.start.assign("hour", date.getHours());
      result.start.assign("minute", date.getMinutes());
      result.start.assign("second", date.getSeconds());
      return result;
    }
  }]);
}(_AbstractParserWithWordBoundary.AbstractParserWithWordBoundaryChecking);