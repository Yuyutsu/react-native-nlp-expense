"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PATTERN = exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.ORDINAL_WORD_DICTIONARY = exports.ORDINAL_NUMBER_PATTERN = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = void 0;
exports.parseDuration = parseDuration;
exports.parseNumberPattern = parseNumberPattern;
exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
exports.parseYear = parseYear;
var _pattern = require("../../utils/pattern.js");
var _years = require("../../calculation/years.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  "domenica": 0,
  "dom": 0,
  "lunedì": 1,
  "lun": 1,
  "martedì": 2,
  "mar": 2,
  "mercoledì": 3,
  "merc": 3,
  "giovedì": 4,
  "giov": 4,
  "venerdì": 5,
  "ven": 5,
  "sabato": 6,
  "sab": 6
};
var FULL_MONTH_NAME_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = {};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = _objectSpread(_objectSpread({}, FULL_MONTH_NAME_DICTIONARY), {}, {
  "gennaio": 1,
  "gen": 1,
  "gen.": 1,
  "febbraio": 2,
  "feb": 2,
  "feb.": 2,
  "febraio": 2,
  "febb": 2,
  "febb.": 2,
  "marzo": 3,
  "mar": 3,
  "mar.": 3,
  "aprile": 4,
  "apr": 4,
  "apr.": 4,
  "maggio": 5,
  "mag": 5,
  "giugno": 6,
  "giu": 6,
  "luglio": 7,
  "lug": 7,
  "lugl": 7,
  "lug.": 7,
  "agosto": 8,
  "ago": 8,
  "settembre": 9,
  "set": 9,
  "set.": 9,
  "sett": 9,
  "sett.": 9,
  "ottobre": 10,
  "ott": 10,
  "ott.": 10,
  "novembre": 11,
  "nov": 11,
  "nov.": 11,
  "dicembre": 12,
  "dic": 12,
  "dice": 12,
  "dic.": 12
});
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  "uno": 1,
  "due": 2,
  "tre": 3,
  "quattro": 4,
  "cinque": 5,
  "sei": 6,
  "sette": 7,
  "otto": 8,
  "nove": 9,
  "dieci": 10,
  "undici": 11,
  "dodici": 12
};
var ORDINAL_WORD_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = {
  "primo": 1,
  "secondo": 2,
  "terzo": 3,
  "quarto": 4,
  "quinto": 5,
  "sesto": 6,
  "settimo": 7,
  "ottavo": 8,
  "nono": 9,
  "decimo": 10,
  "undicesimo": 11,
  "dodicesimo": 12,
  "tredicesimo": 13,
  "quattordicesimo": 14,
  "quindicesimo": 15,
  "sedicesimo": 16,
  "diciassettesimo": 17,
  "diciottesimo": 18,
  "diciannovesimo": 19,
  "ventesimo": 20,
  "ventunesimo": 21,
  "ventiduesimo": 22,
  "ventitreesimo": 23,
  "ventiquattresimo": 24,
  "venticinquesimo": 25,
  "ventiseiesimo": 26,
  "ventisettesimo": 27,
  "ventottesimo": 28,
  "ventinovesimo": 29,
  "trentesimo": 30,
  "trentunesimo": 31
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  "sec": "second",
  "secondo": "second",
  "secondi": "second",
  "min": "minute",
  "mins": "minute",
  "minuti": "minute",
  "h": "hour",
  "hr": "hour",
  "o": "hour",
  "ora": "hour",
  "ore": "hour",
  "giorno": "day",
  "giorni": "day",
  "settimana": "week",
  "settimane": "week",
  "mese": "month",
  "trimestre": "quarter",
  "trimestri": "quarter",
  "anni": "year",
  "anno": "year"
};
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}un?)?|un?\\b(?:\\s{0,2}qualcuno)?|qualcuno|molti|a?\\s{0,2}alcuni\\s{0,2}(?:of)?)");
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  } else if (num === "un" || num === "una") {
    return 1;
  } else if (num.match(/alcuni/)) {
    return 3;
  } else if (num.match(/metá/)) {
    return 0.5;
  } else if (num.match(/paio/)) {
    return 2;
  } else if (num.match(/molti/)) {
    return 7;
  }
  return parseFloat(num);
}
var ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(ORDINAL_WORD_DICTIONARY), "|[0-9]{1,2}(?:mo|ndo|rzo|simo|esimo)?)");
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();
  if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
    return ORDINAL_WORD_DICTIONARY[num];
  }
  num = num.replace(/(?:imo|ndo|rzo|rto|nto|sto|tavo|nono|cimo|timo|esimo)$/i, "");
  return parseInt(num);
}
var YEAR_PATTERN = exports.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9])";
function parseYear(match) {
  if (/BE/i.test(match)) {
    match = match.replace(/BE/i, "");
    return parseInt(match) - 543;
  }
  if (/BCE?/i.test(match)) {
    match = match.replace(/BCE?/i, "");
    return -parseInt(match);
  }
  if (/(AD|CE)/i.test(match)) {
    match = match.replace(/(AD|CE)/i, "");
    return parseInt(match);
  }
  var rawYearNumber = parseInt(match);
  return (0, _years.findMostLikelyADYear)(rawYearNumber);
}
var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,3}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var TIME_UNITS_PATTERN = exports.TIME_UNITS_PATTERN = (0, _pattern.repeatedTimeunitPattern)("(?:(?:about|around)\\s{0,3})?", SINGLE_TIME_UNIT_PATTERN);
function parseDuration(timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  while (match) {
    collectDateTimeFragment(fragments, match);
    remainingText = remainingText.substring(match[0].length).trim();
    match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  }
  return fragments;
}
function collectDateTimeFragment(fragments, match) {
  var num = parseNumberPattern(match[1]);
  var unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
  fragments[unit] = num;
}