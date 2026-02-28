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
var _ESWeekdayParser = _interopRequireDefault(require("./parsers/ESWeekdayParser.js"));
var _ESTimeExpressionParser = _interopRequireDefault(require("./parsers/ESTimeExpressionParser.js"));
var _ESMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/ESMergeDateTimeRefiner.js"));
var _ESMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/ESMergeDateRangeRefiner.js"));
var _ESMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/ESMonthNameLittleEndianParser.js"));
var _ESCasualDateParser = _interopRequireDefault(require("./parsers/ESCasualDateParser.js"));
var _ESCasualTimeParser = _interopRequireDefault(require("./parsers/ESCasualTimeParser.js"));
var _ESTimeUnitWithinFormatParser = _interopRequireDefault(require("./parsers/ESTimeUnitWithinFormatParser.js"));
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
  option.parsers.push(new _ESCasualDateParser["default"]());
  option.parsers.push(new _ESCasualTimeParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](littleEndian), new _ESWeekdayParser["default"](), new _ESTimeExpressionParser["default"](), new _ESMonthNameLittleEndianParser["default"](), new _ESTimeUnitWithinFormatParser["default"]()],
    refiners: [new _ESMergeDateTimeRefiner["default"](), new _ESMergeDateRangeRefiner["default"]()]
  }, strictMode);
}