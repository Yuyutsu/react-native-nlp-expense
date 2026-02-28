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
var _UKTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/UKTimeUnitWithinFormatParser.js"));
var _UKMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/UKMonthNameLittleEndianParser.js"));
var _UKMonthNameParser = _interopRequireDefault(require("./parsers/UKMonthNameParser.js"));
var _UKTimeExpressionParser = _interopRequireDefault(require("./parsers/UKTimeExpressionParser.js"));
var _UKTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/UKTimeUnitAgoFormatParser.js"));
var _UKMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/UKMergeDateRangeRefiner.js"));
var _UKMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/UKMergeDateTimeRefiner.js"));
var _configurations = require("../../configurations.js");
var _UKCasualDateParser = _interopRequireDefault(require("./parsers/UKCasualDateParser.js"));
var _UKCasualTimeParser = _interopRequireDefault(require("./parsers/UKCasualTimeParser.js"));
var _UKWeekdayParser = _interopRequireDefault(require("./parsers/UKWeekdayParser.js"));
var _UKRelativeDateFormatParser = _interopRequireDefault(require("./parsers/UKRelativeDateFormatParser.js"));
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _UKTimeUnitCasualRelativeFormatParser = _interopRequireDefault(require("./parsers/UKTimeUnitCasualRelativeFormatParser.js"));
var _ISOFormatParser = _interopRequireDefault(require("../../common/parsers/ISOFormatParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var casual = exports.casual = new _chrono.Chrono(createCasualConfiguration());
var strict = exports.strict = new _chrono.Chrono(createConfiguration(true));
function createCasualConfiguration() {
  var option = createConfiguration(false);
  option.parsers.unshift(new _UKCasualDateParser["default"]());
  option.parsers.unshift(new _UKCasualTimeParser["default"]());
  option.parsers.unshift(new _UKMonthNameParser["default"]());
  option.parsers.unshift(new _UKRelativeDateFormatParser["default"]());
  option.parsers.unshift(new _UKTimeUnitCasualRelativeFormatParser["default"]());
  return option;
}
function createConfiguration(strictMode) {
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _ISOFormatParser["default"](), new _SlashDateFormatParser["default"](true), new _UKTimeUnitWithinFormatParser["default"](), new _UKMonthNameLittleEndianParser["default"](), new _UKWeekdayParser["default"](), new _UKTimeExpressionParser["default"](strictMode), new _UKTimeUnitAgoFormatParser["default"]()],
    refiners: [new _UKMergeDateTimeRefiner["default"](), new _UKMergeDateRangeRefiner["default"]()]
  }, strictMode);
}
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}