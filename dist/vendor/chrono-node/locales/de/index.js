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
var _SlashDateFormatParser = _interopRequireDefault(require("../../common/parsers/SlashDateFormatParser.js"));
var _ISOFormatParser = _interopRequireDefault(require("../../common/parsers/ISOFormatParser.js"));
var _DETimeExpressionParser = _interopRequireDefault(require("./parsers/DETimeExpressionParser.js"));
var _DEWeekdayParser = _interopRequireDefault(require("./parsers/DEWeekdayParser.js"));
var _DESpecificTimeExpressionParser = _interopRequireDefault(require("./parsers/DESpecificTimeExpressionParser.js"));
var _DEMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/DEMergeDateRangeRefiner.js"));
var _DEMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/DEMergeDateTimeRefiner.js"));
var _DECasualDateParser = _interopRequireDefault(require("./parsers/DECasualDateParser.js"));
var _DECasualTimeParser = _interopRequireDefault(require("./parsers/DECasualTimeParser.js"));
var _DEMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/DEMonthNameLittleEndianParser.js"));
var _DETimeUnitRelativeFormatParser = _interopRequireDefault(require("./parsers/DETimeUnitRelativeFormatParser.js"));
var _DETimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/DETimeUnitWithinFormatParser.js"));
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
  option.parsers.unshift(new _DECasualTimeParser["default"]());
  option.parsers.unshift(new _DECasualDateParser["default"]());
  option.parsers.unshift(new _DETimeUnitRelativeFormatParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _ISOFormatParser["default"](), new _SlashDateFormatParser["default"](littleEndian), new _DETimeExpressionParser["default"](), new _DESpecificTimeExpressionParser["default"](), new _DEMonthNameLittleEndianParser["default"](), new _DEWeekdayParser["default"](), new _DETimeUnitWithinFormatParser["default"]()],
    refiners: [new _DEMergeDateRangeRefiner["default"](), new _DEMergeDateTimeRefiner["default"]()]
  }, strictMode);
}