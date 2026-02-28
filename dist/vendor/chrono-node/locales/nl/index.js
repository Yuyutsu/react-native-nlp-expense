"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Chrono", {
  enumerable: true,
  get: function get() {
    return _chrono.Chrono;
  }
});
Object.defineProperty(exports, "Meridiem", {
  enumerable: true,
  get: function get() {
    return _types.Meridiem;
  }
});
Object.defineProperty(exports, "ParsingComponents", {
  enumerable: true,
  get: function get() {
    return _results.ParsingComponents;
  }
});
Object.defineProperty(exports, "ParsingResult", {
  enumerable: true,
  get: function get() {
    return _results.ParsingResult;
  }
});
Object.defineProperty(exports, "ReferenceWithTimezone", {
  enumerable: true,
  get: function get() {
    return _results.ReferenceWithTimezone;
  }
});
Object.defineProperty(exports, "Weekday", {
  enumerable: true,
  get: function get() {
    return _types.Weekday;
  }
});
exports.casual = void 0;
exports.createCasualConfiguration = createCasualConfiguration;
exports.createConfiguration = createConfiguration;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _configurations = require("../../configurations.js");
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _NLMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/NLMergeDateRangeRefiner.js"));
var _NLMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/NLMergeDateTimeRefiner.js"));
var _NLCasualDateParser = _interopRequireDefault(require("./parsers/NLCasualDateParser.js"));
var _NLCasualTimeParser = _interopRequireDefault(require("./parsers/NLCasualTimeParser.js"));
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _NLTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/NLTimeUnitWithinFormatParser.js"));
var _NLWeekdayParser = _interopRequireDefault(require("./parsers/NLWeekdayParser.js"));
var _NLMonthNameMiddleEndianParser = _interopRequireDefault(require("./parsers/NLMonthNameMiddleEndianParser.js"));
var _NLMonthNameParser = _interopRequireDefault(require("./parsers/NLMonthNameParser.js"));
var _NLSlashMonthFormatParser = _interopRequireDefault(require("./parsers/NLSlashMonthFormatParser.js"));
var _NLTimeExpressionParser = _interopRequireDefault(require("./parsers/NLTimeExpressionParser.js"));
var _NLCasualYearMonthDayParser = _interopRequireDefault(require("./parsers/NLCasualYearMonthDayParser.js"));
var _NLCasualDateTimeParser = _interopRequireDefault(require("./parsers/NLCasualDateTimeParser.js"));
var _NLTimeUnitCasualRelativeFormatParser = _interopRequireDefault(require("./parsers/NLTimeUnitCasualRelativeFormatParser.js"));
var _NLRelativeDateFormatParser = _interopRequireDefault(require("./parsers/NLRelativeDateFormatParser.js"));
var _NLTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/NLTimeUnitAgoFormatParser.js"));
var _NLTimeUnitLaterFormatParser = _interopRequireDefault(require("./parsers/NLTimeUnitLaterFormatParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var casual = exports.casual = new _chrono.Chrono(createCasualConfiguration());
var strict = exports.strict = new _chrono.Chrono(createConfiguration(true));
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}
function createCasualConfiguration() {
  var littleEndian = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var option = createConfiguration(false, littleEndian);
  option.parsers.unshift(new _NLCasualDateParser["default"]());
  option.parsers.unshift(new _NLCasualTimeParser["default"]());
  option.parsers.unshift(new _NLCasualDateTimeParser["default"]());
  option.parsers.unshift(new _NLMonthNameParser["default"]());
  option.parsers.unshift(new _NLRelativeDateFormatParser["default"]());
  option.parsers.unshift(new _NLTimeUnitCasualRelativeFormatParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](littleEndian), new _NLTimeUnitWithinFormatParser["default"](), new _NLMonthNameMiddleEndianParser["default"](), new _NLMonthNameParser["default"](), new _NLWeekdayParser["default"](), new _NLCasualYearMonthDayParser["default"](), new _NLSlashMonthFormatParser["default"](), new _NLTimeExpressionParser["default"](strictMode), new _NLTimeUnitAgoFormatParser["default"](strictMode), new _NLTimeUnitLaterFormatParser["default"](strictMode)],
    refiners: [new _NLMergeDateTimeRefiner["default"](), new _NLMergeDateRangeRefiner["default"]()]
  }, strictMode);
}