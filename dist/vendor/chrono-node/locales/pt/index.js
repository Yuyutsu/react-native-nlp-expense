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
var _PTWeekdayParser = _interopRequireDefault(require("./parsers/PTWeekdayParser.js"));
var _PTTimeExpressionParser = _interopRequireDefault(require("./parsers/PTTimeExpressionParser.js"));
var _PTMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/PTMergeDateTimeRefiner.js"));
var _PTMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/PTMergeDateRangeRefiner.js"));
var _PTMonthNameLittleEndianParser = _interopRequireDefault(require("./parsers/PTMonthNameLittleEndianParser.js"));
var _PTCasualDateParser = _interopRequireDefault(require("./parsers/PTCasualDateParser.js"));
var _PTCasualTimeParser = _interopRequireDefault(require("./parsers/PTCasualTimeParser.js"));
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
  option.parsers.push(new _PTCasualDateParser["default"]());
  option.parsers.push(new _PTCasualTimeParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _configurations.includeCommonConfiguration)({
    parsers: [new _SlashDateFormatParser["default"](littleEndian), new _PTWeekdayParser["default"](), new _PTTimeExpressionParser["default"](), new _PTMonthNameLittleEndianParser["default"]()],
    refiners: [new _PTMergeDateTimeRefiner["default"](), new _PTMergeDateRangeRefiner["default"]()]
  }, strictMode);
}