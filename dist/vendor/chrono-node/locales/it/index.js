"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.casual = exports.GB = void 0;
exports.createCasualConfiguration = createCasualConfiguration;
exports.createConfiguration = createConfiguration;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _ITTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/ITTimeUnitWithinFormatParser.js"));
var _ITMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/ITMonthNameLittleEndianParser.js"));
var _ITMonthNameMiddleEndianParser = _interopRequireDefault(require("./parsers/ITMonthNameMiddleEndianParser.js"));
var _ITMonthNameParser = _interopRequireDefault(require("./parsers/ITMonthNameParser.js"));
var _ITCasualYearMonthDayParser = _interopRequireDefault(require("./parsers/ITCasualYearMonthDayParser.js"));
var _ITSlashMonthFormatParser = _interopRequireDefault(require("./parsers/ITSlashMonthFormatParser.js"));
var _ITTimeExpressionParser = _interopRequireDefault(require("./parsers/ITTimeExpressionParser.js"));
var _ITTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/ITTimeUnitAgoFormatParser.js"));
var _ITTimeUnitLaterFormatParser = _interopRequireDefault(require("./parsers/ITTimeUnitLaterFormatParser.js"));
var _ITMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/ITMergeDateRangeRefiner.js"));
var _ITMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/ITMergeDateTimeRefiner.js"));
var _configurations = require("../../configurations.js");
var _ITCasualDateParser = _interopRequireDefault(require("./parsers/ITCasualDateParser.js"));
var _ITCasualTimeParser = _interopRequireDefault(require("./parsers/ITCasualTimeParser.js"));
var _ITWeekdayParser = _interopRequireDefault(require("./parsers/ITWeekdayParser.js"));
var _ITRelativeDateFormatParser = _interopRequireDefault(require("./parsers/ITRelativeDateFormatParser.js"));
var _chrono = require("../../chrono.js");
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _ITTimeUnitCasualRelativeFormatParser = _interopRequireDefault(require("./parsers/ITTimeUnitCasualRelativeFormatParser.js"));
var _ITMergeRelativeDateRefiner = _interopRequireDefault(require("./refiners/ITMergeRelativeDateRefiner.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var casual = exports.casual = new _chrono.Chrono(createCasualConfiguration(false));
var strict = exports.strict = new _chrono.Chrono(createConfiguration(true, false));
var GB = exports.GB = new _chrono.Chrono(createConfiguration(false, true));
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}
function createCasualConfiguration() {
  var littleEndian = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var option = createConfiguration(false, littleEndian);
  option.parsers.unshift(new _ITCasualDateParser["default"]());
  option.parsers.unshift(new _ITCasualTimeParser["default"]());
  option.parsers.unshift(new _ITMonthNameParser["default"]());
  option.parsers.unshift(new _ITRelativeDateFormatParser["default"]());
  option.parsers.unshift(new _ITTimeUnitCasualRelativeFormatParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](littleEndian), new _ITTimeUnitWithinFormatParser["default"](), new _ITMonthNameLittleEndianParser["default"](), new _ITMonthNameMiddleEndianParser["default"](), new _ITWeekdayParser["default"](), new _ITCasualYearMonthDayParser["default"](), new _ITSlashMonthFormatParser["default"](), new _ITTimeExpressionParser["default"](strictMode), new _ITTimeUnitAgoFormatParser["default"](strictMode), new _ITTimeUnitLaterFormatParser["default"](strictMode)],
    refiners: [new _ITMergeRelativeDateRefiner["default"](), new _ITMergeDateTimeRefiner["default"](), new _ITMergeDateRangeRefiner["default"]()]
  }, strictMode);
}