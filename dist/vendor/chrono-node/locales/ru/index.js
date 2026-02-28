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
var _RUTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/RUTimeUnitWithinFormatParser.js"));
var _RUMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/RUMonthNameLittleEndianParser.js"));
var _RUMonthNameParser = _interopRequireDefault(require("./parsers/RUMonthNameParser.js"));
var _RUTimeExpressionParser = _interopRequireDefault(require("./parsers/RUTimeExpressionParser.js"));
var _RUTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/RUTimeUnitAgoFormatParser.js"));
var _RUMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/RUMergeDateRangeRefiner.js"));
var _RUMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/RUMergeDateTimeRefiner.js"));
var _configurations = require("../../configurations.js");
var _RUCasualDateParser = _interopRequireDefault(require("./parsers/RUCasualDateParser.js"));
var _RUCasualTimeParser = _interopRequireDefault(require("./parsers/RUCasualTimeParser.js"));
var _RUWeekdayParser = _interopRequireDefault(require("./parsers/RUWeekdayParser.js"));
var _RURelativeDateFormatParser = _interopRequireDefault(require("./parsers/RURelativeDateFormatParser.js"));
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _RUTimeUnitCasualRelativeFormatParser = _interopRequireDefault(require("./parsers/RUTimeUnitCasualRelativeFormatParser.js"));
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
  var option = createConfiguration(false);
  option.parsers.unshift(new _RUCasualDateParser["default"]());
  option.parsers.unshift(new _RUCasualTimeParser["default"]());
  option.parsers.unshift(new _RUMonthNameParser["default"]());
  option.parsers.unshift(new _RURelativeDateFormatParser["default"]());
  option.parsers.unshift(new _RUTimeUnitCasualRelativeFormatParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](true), new _RUTimeUnitWithinFormatParser["default"](), new _RUMonthNameLittleEndianParser["default"](), new _RUWeekdayParser["default"](), new _RUTimeExpressionParser["default"](strictMode), new _RUTimeUnitAgoFormatParser["default"]()],
    refiners: [new _RUMergeDateTimeRefiner["default"](), new _RUMergeDateRangeRefiner["default"]()]
  }, strictMode);
}