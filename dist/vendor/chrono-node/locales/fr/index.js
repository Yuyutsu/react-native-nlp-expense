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
var _FRCasualDateParser = _interopRequireDefault(require("./parsers/FRCasualDateParser.js"));
var _FRCasualTimeParser = _interopRequireDefault(require("./parsers/FRCasualTimeParser.js"));
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _FRTimeExpressionParser = _interopRequireDefault(require("./parsers/FRTimeExpressionParser.js"));
var _FRMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/FRMergeDateTimeRefiner.js"));
var _FRMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/FRMergeDateRangeRefiner.js"));
var _FRWeekdayParser = _interopRequireDefault(require("./parsers/FRWeekdayParser.js"));
var _FRSpecificTimeExpressionParser = _interopRequireDefault(require("./parsers/FRSpecificTimeExpressionParser.js"));
var _FRMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/FRMonthNameLittleEndianParser.js"));
var _FRTimeUnitAgoFormatParser = _interopRequireDefault(require("./parsers/FRTimeUnitAgoFormatParser.js"));
var _FRTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/FRTimeUnitWithinFormatParser.js"));
var _FRTimeUnitRelativeFormatParser = _interopRequireDefault(require("./parsers/FRTimeUnitRelativeFormatParser.js"));
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
  option.parsers.unshift(new _FRCasualDateParser["default"]());
  option.parsers.unshift(new _FRCasualTimeParser["default"]());
  option.parsers.unshift(new _FRTimeUnitRelativeFormatParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](littleEndian), new _FRMonthNameLittleEndianParser["default"](), new _FRTimeExpressionParser["default"](), new _FRSpecificTimeExpressionParser["default"](), new _FRTimeUnitAgoFormatParser["default"](), new _FRTimeUnitWithinFormatParser["default"](), new _FRWeekdayParser["default"]()],
    refiners: [new _FRMergeDateTimeRefiner["default"](), new _FRMergeDateRangeRefiner["default"]()]
  }, strictMode);
}