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
exports.hant = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _ExtractTimezoneOffsetRefiner = _interopRequireDefault(require("../../../common/refiners/ExtractTimezoneOffsetRefiner.js"));
var _configurations = require("../../../configurations.js");
var _chrono = require("../../../chrono.js");
var _results = require("../../../results.js");
var _types = require("../../../types.js");
var _ZHHantCasualDateParser = _interopRequireDefault(require("./parsers/ZHHantCasualDateParser.js"));
var _ZHHantDateParser = _interopRequireDefault(require("./parsers/ZHHantDateParser.js"));
var _ZHHantDeadlineFormatParser = _interopRequireDefault(require("./parsers/ZHHantDeadlineFormatParser.js"));
var _ZHHantRelationWeekdayParser = _interopRequireDefault(require("./parsers/ZHHantRelationWeekdayParser.js"));
var _ZHHantTimeExpressionParser = _interopRequireDefault(require("./parsers/ZHHantTimeExpressionParser.js"));
var _ZHHantWeekdayParser = _interopRequireDefault(require("./parsers/ZHHantWeekdayParser.js"));
var _ZHHantMergeDateRangeRefiner = _interopRequireDefault(require("./refiners/ZHHantMergeDateRangeRefiner.js"));
var _ZHHantMergeDateTimeRefiner = _interopRequireDefault(require("./refiners/ZHHantMergeDateTimeRefiner.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hant = exports.hant = new _chrono.Chrono(createCasualConfiguration());
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
  option.parsers.unshift(new _ZHHantCasualDateParser["default"]());
  return option;
}
function createConfiguration() {
  var configuration = (0, _configurations.includeCommonConfiguration)({
    parsers: [new _ZHHantDateParser["default"](), new _ZHHantRelationWeekdayParser["default"](), new _ZHHantWeekdayParser["default"](), new _ZHHantTimeExpressionParser["default"](), new _ZHHantDeadlineFormatParser["default"]()],
    refiners: [new _ZHHantMergeDateRangeRefiner["default"](), new _ZHHantMergeDateTimeRefiner["default"]()]
  });
  configuration.refiners = configuration.refiners.filter(function (refiner) {
    return !(refiner instanceof _ExtractTimezoneOffsetRefiner["default"]);
  });
  return configuration;
}