"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includeCommonConfiguration = includeCommonConfiguration;
var _ExtractTimezoneAbbrRefiner = _interopRequireDefault(require("./common/refiners/ExtractTimezoneAbbrRefiner.js"));
var _ExtractTimezoneOffsetRefiner = _interopRequireDefault(require("./common/refiners/ExtractTimezoneOffsetRefiner.js"));
var _OverlapRemovalRefiner = _interopRequireDefault(require("./common/refiners/OverlapRemovalRefiner.js"));
var _ForwardDateRefiner = _interopRequireDefault(require("./common/refiners/ForwardDateRefiner.js"));
var _UnlikelyFormatFilter = _interopRequireDefault(require("./common/refiners/UnlikelyFormatFilter.js"));
var _ISOFormatParser = _interopRequireDefault(require("./common/parsers/ISOFormatParser.js"));
var _MergeWeekdayComponentRefiner = _interopRequireDefault(require("./common/refiners/MergeWeekdayComponentRefiner.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function includeCommonConfiguration(configuration) {
  var strictMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  configuration.parsers.unshift(new _ISOFormatParser["default"]());
  configuration.refiners.unshift(new _MergeWeekdayComponentRefiner["default"]());
  configuration.refiners.unshift(new _ExtractTimezoneOffsetRefiner["default"]());
  configuration.refiners.unshift(new _OverlapRemovalRefiner["default"]());
  configuration.refiners.push(new _ExtractTimezoneAbbrRefiner["default"]());
  configuration.refiners.push(new _OverlapRemovalRefiner["default"]());
  configuration.refiners.push(new _ForwardDateRefiner["default"]());
  configuration.refiners.push(new _UnlikelyFormatFilter["default"](strictMode));
  return configuration;
}