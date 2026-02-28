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
Object.defineProperty(exports, "ParsingContext", {
  enumerable: true,
  get: function get() {
    return _chrono.ParsingContext;
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
exports.nl = exports.ja = exports.it = exports.fr = exports.es = exports.en = exports.de = exports.casual = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.zh = exports.uk = exports.sv = exports.strict = exports.ru = exports.pt = void 0;
var en = _interopRequireWildcard(require("./locales/en/index.js"));
exports.en = en;
var _chrono = require("./chrono.js");
var _results = require("./results.js");
var _types = require("./types.js");
var de = _interopRequireWildcard(require("./locales/de/index.js"));
exports.de = de;
var fr = _interopRequireWildcard(require("./locales/fr/index.js"));
exports.fr = fr;
var ja = _interopRequireWildcard(require("./locales/ja/index.js"));
exports.ja = ja;
var pt = _interopRequireWildcard(require("./locales/pt/index.js"));
exports.pt = pt;
var nl = _interopRequireWildcard(require("./locales/nl/index.js"));
exports.nl = nl;
var zh = _interopRequireWildcard(require("./locales/zh/index.js"));
exports.zh = zh;
var ru = _interopRequireWildcard(require("./locales/ru/index.js"));
exports.ru = ru;
var es = _interopRequireWildcard(require("./locales/es/index.js"));
exports.es = es;
var uk = _interopRequireWildcard(require("./locales/uk/index.js"));
exports.uk = uk;
var it = _interopRequireWildcard(require("./locales/it/index.js"));
exports.it = it;
var sv = _interopRequireWildcard(require("./locales/sv/index.js"));
exports.sv = sv;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var strict = exports.strict = en.strict;
var casual = exports.casual = en.casual;
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}