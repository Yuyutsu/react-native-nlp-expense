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
var _JPStandardParser = _interopRequireDefault(require("./parsers/JPStandardParser.js"));
var _JPMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/JPMergeDateRangeRefiner.js"));
var _JPCasualDateParser = _interopRequireDefault(require("./parsers/JPCasualDateParser.js"));
var _JPWeekdayParser = _interopRequireDefault(require("./parsers/JPWeekdayParser.js"));
var _JPSlashDateFormatParser = _interopRequireDefault(require("./parsers/JPSlashDateFormatParser.js"));
var _JPTimeExpressionParser = _interopRequireDefault(require("./parsers/JPTimeExpressionParser.js"));
var _JPMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/JPMergeDateTimeRefiner.js"));
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _JPMergeWeekdayComponentRefiner = _interopRequireDefault(require("./refiners/JPMergeWeekdayComponentRefiner.js"));
var _JPWeekdayWithParenthesesParser = _interopRequireDefault(require("./parsers/JPWeekdayWithParenthesesParser.js"));
var _configurations = require("../../configurations.js");
var _MergeWeekdayComponentRefiner = _interopRequireDefault(require("../../common/refiners/MergeWeekdayComponentRefiner.js"));
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
  option.parsers.unshift(new _JPCasualDateParser["default"]());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var configuration = (0, _configurations.includeCommonConfiguration)({
    parsers: [new _JPStandardParser["default"](), new _JPWeekdayParser["default"](), new _JPWeekdayWithParenthesesParser["default"](), new _JPSlashDateFormatParser["default"](), new _JPTimeExpressionParser["default"]()],
    refiners: [new _JPMergeWeekdayComponentRefiner["default"](), new _JPMergeDateTimeRefiner["default"](), new _JPMergeDateRangeRefiner["default"]()]
  }, strictMode);
  configuration.refiners = configuration.refiners.filter(function (refiner) {
    return !(refiner instanceof _MergeWeekdayComponentRefiner["default"]);
  });
  return configuration;
}