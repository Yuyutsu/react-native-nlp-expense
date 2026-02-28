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
exports.GB = void 0;
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
exports.configuration = exports.casual = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.strict = void 0;
var _chrono = require("../../chrono.js");
var _results = require("../../results.js");
var _types = require("../../types.js");
var _configuration = _interopRequireDefault(require("./configuration.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var configuration = exports.configuration = new _configuration["default"]();
var casual = exports.casual = new _chrono.Chrono(configuration.createCasualConfiguration(false));
var strict = exports.strict = new _chrono.Chrono(configuration.createConfiguration(true, false));
var GB = exports.GB = new _chrono.Chrono(configuration.createCasualConfiguration(true));
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}