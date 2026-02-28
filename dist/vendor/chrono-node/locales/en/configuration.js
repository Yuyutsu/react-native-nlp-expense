"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ENTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/ENTimeUnitWithinFormatParser.js"));
var _ENMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/ENMonthNameLittleEndianParser.js"));
var _ENMonthNameMiddleEndianParser = _interopRequireDefault(require("./parsers/ENMonthNameMiddleEndianParser.js"));
var _ENMonthNameParser = _interopRequireDefault(require("./parsers/ENMonthNameParser.js"));
var _ENYearMonthDayParser = _interopRequireDefault(require("./parsers/ENYearMonthDayParser.js"));
var _ENSlashMonthFormatParser = _interopRequireDefault(require("./parsers/ENSlashMonthFormatParser.js"));
var _ENTimeExpressionParser = _interopRequireDefault(require("./parsers/ENTimeExpressionParser.js"));
var _ENTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/ENTimeUnitAgoFormatParser.js"));
var _ENTimeUnitLaterFormatParser = _interopRequireDefault(require("./parsers/ENTimeUnitLaterFormatParser.js"));
var _ENMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/ENMergeDateRangeRefiner.js"));
var _ENMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/ENMergeDateTimeRefiner.js"));
var _configurations = require("../../configurations.js");
var _ENCasualDateParser = _interopRequireDefault(require("./parsers/ENCasualDateParser.js"));
var _ENCasualTimeParser = _interopRequireDefault(require("./parsers/ENCasualTimeParser.js"));
var _ENWeekdayParser = _interopRequireDefault(require("./parsers/ENWeekdayParser.js"));
var _ENRelativeDateFormatParser = _interopRequireDefault(require("./parsers/ENRelativeDateFormatParser.js"));
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _ENTimeUnitCasualRelativeFormatParser = _interopRequireDefault(require("./parsers/ENTimeUnitCasualRelativeFormatParser.js"));
var _ENMergeRelativeAfterDateRefiner = _interopRequireDefault(require("./refiners/ENMergeRelativeAfterDateRefiner.js"));
var _ENMergeRelativeFollowByDateRefiner = _interopRequireDefault(require("./refiners/ENMergeRelativeFollowByDateRefiner.js"));
var _OverlapRemovalRefiner = _interopRequireDefault(require("../../common/refiners/OverlapRemovalRefiner.js"));
var _ENExtractYearSuffixRefiner = _interopRequireDefault(require("./refiners/ENExtractYearSuffixRefiner.js"));
var _ENUnlikelyFormatFilter = _interopRequireDefault(require("./refiners/ENUnlikelyFormatFilter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ENDefaultConfiguration = exports["default"] = /*#__PURE__*/function () {
  function ENDefaultConfiguration() {
    _classCallCheck(this, ENDefaultConfiguration);
  }
  return _createClass(ENDefaultConfiguration, [{
    key: "createCasualConfiguration",
    value: function createCasualConfiguration() {
      var littleEndian = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var option = this.createConfiguration(false, littleEndian);
      option.parsers.push(new _ENCasualDateParser["default"]());
      option.parsers.push(new _ENCasualTimeParser["default"]());
      option.parsers.push(new _ENMonthNameParser["default"]());
      option.parsers.push(new _ENRelativeDateFormatParser["default"]());
      option.parsers.push(new _ENTimeUnitCasualRelativeFormatParser["default"]());
      option.refiners.push(new _ENUnlikelyFormatFilter["default"]());
      return option;
    }
  }, {
    key: "createConfiguration",
    value: function createConfiguration() {
      var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var options = (0, _configurations.includeCommonConfiguration)({
        parsers: [new _SlashDateFormatParser["default"](littleEndian), new _ENTimeUnitWithinFormatParser["default"](strictMode), new _ENMonthNameLittleEndianParser["default"](), new _ENMonthNameMiddleEndianParser["default"](littleEndian), new _ENWeekdayParser["default"](), new _ENSlashMonthFormatParser["default"](), new _ENTimeExpressionParser["default"](strictMode), new _ENTimeUnitAgoFormatParser["default"](strictMode), new _ENTimeUnitLaterFormatParser["default"](strictMode)],
        refiners: [new _ENMergeDateTimeRefiner["default"]()]
      }, strictMode);
      options.parsers.unshift(new _ENYearMonthDayParser["default"](strictMode));
      options.refiners.unshift(new _ENMergeRelativeFollowByDateRefiner["default"]());
      options.refiners.unshift(new _ENMergeRelativeAfterDateRefiner["default"]());
      options.refiners.unshift(new _OverlapRemovalRefiner["default"]());
      options.refiners.push(new _ENMergeDateTimeRefiner["default"]());
      options.refiners.push(new _ENExtractYearSuffixRefiner["default"]());
      options.refiners.push(new _ENMergeDateRangeRefiner["default"]());
      return options;
    }
  }]);
}();