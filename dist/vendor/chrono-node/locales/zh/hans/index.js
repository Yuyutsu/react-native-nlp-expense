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
exports.hans = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _ExtractTimezoneOffsetRefiner = _interopRequireDefault(require("../../../common/refiners/ExtractTimezoneOffsetRefiner.js"));
var _configurations = require("../../../configurations.js");
var _chrono = require("../../../chrono.js");
var _results = require("../../../results.js");
var _types = require("../../../types.js");
var _ZHHansCasualDateParser = _interopRequireDefault(require("./parsers/ZHHansCasualDateParser.js"));
var _ZHHansDateParser = _interopRequireDefault(require("./parsers/ZHHansDateParser.js"));
var _ZHHansDeadlineFormatParser = _interopRequireDefault(require("./parsers/ZHHansDeadlineFormatParser.js"));
var _ZHHansRelationWeekdayParser = _interopRequireDefault(require("./parsers/ZHHansRelationWeekdayParser.js"));
var _ZHHansTimeExpressionParser = _interopRequireDefault(require("./parsers/ZHHansTimeExpressionParser.js"));
var _ZHHansWeekdayParser = _interopRequireDefault(require("./parsers/ZHHansWeekdayParser.js"));
var _ZHHansMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/ZHHansMergeDateRangeRefiner.js"));
var _ZHHansMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/ZHHansMergeDateTimeRefiner.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hans = exports.hans = new _chrono.Chrono(createCasualConfiguration());
var casual = exports.casual = new _chrono.Chrono(createCasualConfiguration());
var strict = exports.strict = new _chrono.Chrono(createConfiguration());
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}
function createCasualConfiguration() {
  var option = createConfiguration();
  option.parsers.unshift(new _ZHHansCasualDateParser["default"]());
  return option;
}
function createConfiguration() {
  var configuration = (0, _configurations.includeCommonConfiguration)({
    parsers: [new _ZHHansDateParser["default"](), new _ZHHansRelationWeekdayParser["default"](), new _ZHHansWeekdayParser["default"](), new _ZHHansTimeExpressionParser["default"](), new _ZHHansDeadlineFormatParser["default"]()],
    refiners: [new _ZHHansMergeDateRangeRefiner["default"](), new _ZHHansMergeDateTimeRefiner["default"]()]
  });
  configuration.refiners = configuration.refiners.filter(function (refiner) {
    return !(refiner instanceof _ExtractTimezoneOffsetRefiner["default"]);
  });
  return configuration;
}