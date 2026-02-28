"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PATTERN = exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.REGEX_PARTS = exports.ORDINAL_WORD_DICTIONARY = exports.ORDINAL_NUMBER_PATTERN = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = void 0;
exports.parseDuration = parseDuration;
exports.parseNumberPattern = parseNumberPattern;
exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
exports.parseYearPattern = parseYearPattern;
var _pattern = require("../../utils/pattern.js");
var _years = require("../../calculation/years.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var REGEX_PARTS = exports.REGEX_PARTS = {
  leftBoundary: "([^\\p{L}\\p{N}_]|^)",
  rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
  flags: "iu"
};
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  "неділя": 0,
  "неділі": 0,
  "неділю": 0,
  "нд": 0,
  "нд.": 0,
  "понеділок": 1,
  "понеділка": 1,
  "пн": 1,
  "пн.": 1,
  "вівторок": 2,
  "вівторка": 2,
  "вт": 2,
  "вт.": 2,
  "середа": 3,
  "середи": 3,
  "середу": 3,
  "ср": 3,
  "ср.": 3,
  "четвер": 4,
  "четверга": 4,
  "четвергу": 4,
  "чт": 4,
  "чт.": 4,
  "п'ятниця": 5,
  "п'ятниці": 5,
  "п'ятницю": 5,
  "пт": 5,
  "пт.": 5,
  "субота": 6,
  "суботи": 6,
  "суботу": 6,
  "сб": 6,
  "сб.": 6
};
var FULL_MONTH_NAME_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = {
  "січень": 1,
  "січня": 1,
  "січні": 1,
  "лютий": 2,
  "лютого": 2,
  "лютому": 2,
  "березень": 3,
  "березня": 3,
  "березні": 3,
  "квітень": 4,
  "квітня": 4,
  "квітні": 4,
  "травень": 5,
  "травня": 5,
  "травні": 5,
  "червень": 6,
  "червня": 6,
  "червні": 6,
  "липень": 7,
  "липня": 7,
  "липні": 7,
  "серпень": 8,
  "серпня": 8,
  "серпні": 8,
  "вересень": 9,
  "вересня": 9,
  "вересні": 9,
  "жовтень": 10,
  "жовтня": 10,
  "жовтні": 10,
  "листопад": 11,
  "листопада": 11,
  "листопаду": 11,
  "грудень": 12,
  "грудня": 12,
  "грудні": 12
};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = _objectSpread(_objectSpread({}, FULL_MONTH_NAME_DICTIONARY), {}, {
  "січ": 1,
  "січ.": 1,
  "лют": 2,
  "лют.": 2,
  "бер": 3,
  "бер.": 3,
  "квіт": 4,
  "квіт.": 4,
  "трав": 5,
  "трав.": 5,
  "черв": 6,
  "черв.": 6,
  "лип": 7,
  "лип.": 7,
  "серп": 8,
  "серп.": 8,
  "сер": 8,
  "cер.": 8,
  "вер": 9,
  "вер.": 9,
  "верес": 9,
  "верес.": 9,
  "жовт": 10,
  "жовт.": 10,
  "листоп": 11,
  "листоп.": 11,
  "груд": 12,
  "груд.": 12
});
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  "один": 1,
  "одна": 1,
  "одної": 1,
  "одну": 1,
  "дві": 2,
  "два": 2,
  "двох": 2,
  "три": 3,
  "трьох": 3,
  "чотири": 4,
  "чотирьох": 4,
  "п'ять": 5,
  "п'яти": 5,
  "шість": 6,
  "шести": 6,
  "сім": 7,
  "семи": 7,
  "вісім": 8,
  "восьми": 8,
  "дев'ять": 9,
  "дев'яти": 9,
  "десять": 10,
  "десяти": 10,
  "одинадцять": 11,
  "одинадцяти": 11,
  "дванадцять": 12,
  "дванадцяти": 12
};
var ORDINAL_WORD_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = {
  "перше": 1,
  "першого": 1,
  "друге": 2,
  "другого": 2,
  "третє": 3,
  "третього": 3,
  "четверте": 4,
  "четвертого": 4,
  "п'яте": 5,
  "п'ятого": 5,
  "шосте": 6,
  "шостого": 6,
  "сьоме": 7,
  "сьомого": 7,
  "восьме": 8,
  "восьмого": 8,
  "дев'яте": 9,
  "дев'ятого": 9,
  "десяте": 10,
  "десятого": 10,
  "одинадцяте": 11,
  "одинадцятого": 11,
  "дванадцяте": 12,
  "дванадцятого": 12,
  "тринадцяте": 13,
  "тринадцятого": 13,
  "чотирнадцяте": 14,
  "чотинрнадцятого": 14,
  "п'ятнадцяте": 15,
  "п'ятнадцятого": 15,
  "шістнадцяте": 16,
  "шістнадцятого": 16,
  "сімнадцяте": 17,
  "сімнадцятого": 17,
  "вісімнадцяте": 18,
  "вісімнадцятого": 18,
  "дев'ятнадцяте": 19,
  "дев'ятнадцятого": 19,
  "двадцяте": 20,
  "двадцятого": 20,
  "двадцять перше": 21,
  "двадцять першого": 21,
  "двадцять друге": 22,
  "двадцять другого": 22,
  "двадцять третє": 23,
  "двадцять третього": 23,
  "двадцять четверте": 24,
  "двадцять четвертого": 24,
  "двадцять п'яте": 25,
  "двадцять п'ятого": 25,
  "двадцять шосте": 26,
  "двадцять шостого": 26,
  "двадцять сьоме": 27,
  "двадцять сьомого": 27,
  "двадцять восьме": 28,
  "двадцять восьмого": 28,
  "двадцять дев'яте": 29,
  "двадцять дев'ятого": 29,
  "тридцяте": 30,
  "тридцятого": 30,
  "тридцять перше": 31,
  "тридцять першого": 31
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  сек: "second",
  секунда: "second",
  секунд: "second",
  секунди: "second",
  секунду: "second",
  секундочок: "second",
  секундочки: "second",
  секундочку: "second",
  хв: "minute",
  хвилина: "minute",
  хвилин: "minute",
  хвилини: "minute",
  хвилину: "minute",
  хвилинок: "minute",
  хвилинки: "minute",
  хвилинку: "minute",
  хвилиночок: "minute",
  хвилиночки: "minute",
  хвилиночку: "minute",
  год: "hour",
  година: "hour",
  годин: "hour",
  години: "hour",
  годину: "hour",
  годинка: "hour",
  годинок: "hour",
  годинки: "hour",
  годинку: "hour",
  день: "day",
  дня: "day",
  днів: "day",
  дні: "day",
  доба: "day",
  добу: "day",
  тиждень: "week",
  тижню: "week",
  тижня: "week",
  тижні: "week",
  тижнів: "week",
  місяць: "month",
  місяців: "month",
  місяці: "month",
  місяця: "month",
  квартал: "quarter",
  кварталу: "quarter",
  квартала: "quarter",
  кварталів: "quarter",
  кварталі: "quarter",
  рік: "year",
  року: "year",
  році: "year",
  років: "year",
  роки: "year"
};
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|\u043F\u0456\u0432|\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430|\u043F\u0430\u0440(?:\u0443)|\\s{0,3})");
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  }
  if (num.match(/декілька/)) {
    return 2;
  } else if (num.match(/пів/)) {
    return 0.5;
  } else if (num.match(/пар/)) {
    return 2;
  } else if (num === "") {
    return 1;
  }
  return parseFloat(num);
}
var ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(ORDINAL_WORD_DICTIONARY), "|[0-9]{1,2}(?:\u0433\u043E|\u043E\u0433\u043E|\u0435)?)");
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();
  if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
    return ORDINAL_WORD_DICTIONARY[num];
  }
  return parseInt(num);
}
var year = "(?:\\s+(?:року|рік|р|р.))?";
var YEAR_PATTERN = exports.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}".concat(year, "\\s*(?:\u043D.\u0435.|\u0434\u043E \u043D.\u0435.|\u043D. \u0435.|\u0434\u043E \u043D. \u0435.)|[1-2][0-9]{3}").concat(year, "|[5-9][0-9]").concat(year, ")");
function parseYearPattern(match) {
  if (/(рік|року|р|р.)/i.test(match)) {
    match = match.replace(/(рік|року|р|р.)/i, "");
  }
  if (/(до н.е.|до н. е.)/i.test(match)) {
    match = match.replace(/(до н.е.|до н. е.)/i, "");
    return -parseInt(match);
  }
  if (/(н. е.|н.е.)/i.test(match)) {
    match = match.replace(/(н. е.|н.е.)/i, "");
    return parseInt(match);
  }
  var rawYearNumber = parseInt(match);
  return (0, _years.findMostLikelyADYear)(rawYearNumber);
}
var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,3}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var TIME_UNITS_PATTERN = exports.TIME_UNITS_PATTERN = (0, _pattern.repeatedTimeunitPattern)("(?:(?:\u0431\u043B\u0438\u0437\u044C\u043A\u043E|\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u043D\u043E)\\s{0,3})?", SINGLE_TIME_UNIT_PATTERN);
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