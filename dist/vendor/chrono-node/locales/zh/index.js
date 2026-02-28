"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
exports.hant = exports.hans = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _configurations = require("../../configurations.js");
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _ExtractTimezoneOffsetRefiner = _interopRequireDefault(require("../../common/refiners/ExtractTimezoneOffsetRefiner.js"));
var _ZHHansDateParser = _interopRequireDefault(require("./hans/parsers/ZHHansDateParser.js"));
var _ZHHansDeadlineFormatParser = _interopRequireDefault(require("./hans/parsers/ZHHansDeadlineFormatParser.js"));
var _ZHHansRelationWeekdayParser = _interopRequireDefault(require("./hans/parsers/ZHHansRelationWeekdayParser.js"));
var _ZHHansTimeExpressionParser = _interopRequireDefault(require("./hans/parsers/ZHHansTimeExpressionParser.js"));
var _ZHHansWeekdayParser = _interopRequireDefault(require("./hans/parsers/ZHHansWeekdayParser.js"));
var _ZHHantCasualDateParser = _interopRequireDefault(require("./hant/parsers/ZHHantCasualDateParser.js"));
var _ZHHantDateParser = _interopRequireDefault(require("./hant/parsers/ZHHantDateParser.js"));
var _ZHHantDeadlineFormatParser = _interopRequireDefault(require("./hant/parsers/ZHHantDeadlineFormatParser.js"));
var _ZHHantRelationWeekdayParser = _interopRequireDefault(require("./hant/parsers/ZHHantRelationWeekdayParser.js"));
var _ZHHantTimeExpressionParser = _interopRequireDefault(require("./hant/parsers/ZHHantTimeExpressionParser.js"));
var _ZHHantWeekdayParser = _interopRequireDefault(require("./hant/parsers/ZHHantWeekdayParser.js"));
var _ZHHantMergeDateRangeRefiner = _interopRequireDefault(require("./hant/refiners/ZHHantMergeDateRangeRefiner.js"));
var _ZHHantMergeDateTimeRefiner = _interopRequireDefault(require("./hant/refiners/ZHHantMergeDateTimeRefiner.js"));
var _hant = _interopRequireWildcard(require("./hant/index.js"));
exports.hant = _hant;
var _hans = _interopRequireWildcard(require("./hans/index.js"));
exports.hans = _hans;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    parsers: [new _ZHHantDateParser["default"](), new _ZHHansDateParser["default"](), new _ZHHantRelationWeekdayParser["default"](), new _ZHHansRelationWeekdayParser["default"](), new _ZHHantWeekdayParser["default"](), new _ZHHansWeekdayParser["default"](), new _ZHHantTimeExpressionParser["default"](), new _ZHHansTimeExpressionParser["default"](), new _ZHHantDeadlineFormatParser["default"](), new _ZHHansDeadlineFormatParser["default"]()],
    refiners: [new _ZHHantMergeDateRangeRefiner["default"](), new _ZHHantMergeDateTimeRefiner["default"]()]
  });
  configuration.refiners = configuration.refiners.filter(function (refiner) {
    return !(refiner instanceof _ExtractTimezoneOffsetRefiner["default"]);
  });
  return configuration;
}