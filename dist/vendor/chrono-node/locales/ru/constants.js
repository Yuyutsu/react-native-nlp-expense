"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PATTERN = exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.REGEX_PARTS = exports.ORDINAL_WORD_DICTIONARY = exports.ORDINAL_NUMBER_PATTERN = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = void 0;
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
var REGEX_PARTS = exports.REGEX_PARTS = {
  leftBoundary: "([^\\p{L}\\p{N}_]|^)",
  rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
  flags: "iu"
};
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  воскресенье: 0,
  воскресенья: 0,
  вск: 0,
  "вск.": 0,
  понедельник: 1,
  понедельника: 1,
  пн: 1,
  "пн.": 1,
  вторник: 2,
  вторника: 2,
  вт: 2,
  "вт.": 2,
  среда: 3,
  среды: 3,
  среду: 3,
  ср: 3,
  "ср.": 3,
  четверг: 4,
  четверга: 4,
  чт: 4,
  "чт.": 4,
  пятница: 5,
  пятницу: 5,
  пятницы: 5,
  пт: 5,
  "пт.": 5,
  суббота: 6,
  субботу: 6,
  субботы: 6,
  сб: 6,
  "сб.": 6
};
var FULL_MONTH_NAME_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = {
  январь: 1,
  января: 1,
  январе: 1,
  февраль: 2,
  февраля: 2,
  феврале: 2,
  март: 3,
  марта: 3,
  марте: 3,
  апрель: 4,
  апреля: 4,
  апреле: 4,
  май: 5,
  мая: 5,
  мае: 5,
  июнь: 6,
  июня: 6,
  июне: 6,
  июль: 7,
  июля: 7,
  июле: 7,
  август: 8,
  августа: 8,
  августе: 8,
  сентябрь: 9,
  сентября: 9,
  сентябре: 9,
  октябрь: 10,
  октября: 10,
  октябре: 10,
  ноябрь: 11,
  ноября: 11,
  ноябре: 11,
  декабрь: 12,
  декабря: 12,
  декабре: 12
};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = _objectSpread(_objectSpread({}, FULL_MONTH_NAME_DICTIONARY), {}, {
  янв: 1,
  "янв.": 1,
  фев: 2,
  "фев.": 2,
  мар: 3,
  "мар.": 3,
  апр: 4,
  "апр.": 4,
  авг: 8,
  "авг.": 8,
  сен: 9,
  "сен.": 9,
  окт: 10,
  "окт.": 10,
  ноя: 11,
  "ноя.": 11,
  дек: 12,
  "дек.": 12
});
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  один: 1,
  одна: 1,
  одной: 1,
  одну: 1,
  две: 2,
  два: 2,
  двух: 2,
  три: 3,
  трех: 3,
  трёх: 3,
  четыре: 4,
  четырех: 4,
  четырёх: 4,
  пять: 5,
  пяти: 5,
  шесть: 6,
  шести: 6,
  семь: 7,
  семи: 7,
  восемь: 8,
  восьми: 8,
  девять: 9,
  девяти: 9,
  десять: 10,
  десяти: 10,
  одиннадцать: 11,
  одиннадцати: 11,
  двенадцать: 12,
  двенадцати: 12
};
var ORDINAL_WORD_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = {
  первое: 1,
  первого: 1,
  второе: 2,
  второго: 2,
  третье: 3,
  третьего: 3,
  четвертое: 4,
  четвертого: 4,
  пятое: 5,
  пятого: 5,
  шестое: 6,
  шестого: 6,
  седьмое: 7,
  седьмого: 7,
  восьмое: 8,
  восьмого: 8,
  девятое: 9,
  девятого: 9,
  десятое: 10,
  десятого: 10,
  одиннадцатое: 11,
  одиннадцатого: 11,
  двенадцатое: 12,
  двенадцатого: 12,
  тринадцатое: 13,
  тринадцатого: 13,
  четырнадцатое: 14,
  четырнадцатого: 14,
  пятнадцатое: 15,
  пятнадцатого: 15,
  шестнадцатое: 16,
  шестнадцатого: 16,
  семнадцатое: 17,
  семнадцатого: 17,
  восемнадцатое: 18,
  восемнадцатого: 18,
  девятнадцатое: 19,
  девятнадцатого: 19,
  двадцатое: 20,
  двадцатого: 20,
  "двадцать первое": 21,
  "двадцать первого": 21,
  "двадцать второе": 22,
  "двадцать второго": 22,
  "двадцать третье": 23,
  "двадцать третьего": 23,
  "двадцать четвертое": 24,
  "двадцать четвертого": 24,
  "двадцать пятое": 25,
  "двадцать пятого": 25,
  "двадцать шестое": 26,
  "двадцать шестого": 26,
  "двадцать седьмое": 27,
  "двадцать седьмого": 27,
  "двадцать восьмое": 28,
  "двадцать восьмого": 28,
  "двадцать девятое": 29,
  "двадцать девятого": 29,
  "тридцатое": 30,
  "тридцатого": 30,
  "тридцать первое": 31,
  "тридцать первого": 31
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  сек: "second",
  секунда: "second",
  секунд: "second",
  секунды: "second",
  секунду: "second",
  секундочка: "second",
  секундочки: "second",
  секундочек: "second",
  секундочку: "second",
  мин: "minute",
  минута: "minute",
  минут: "minute",
  минуты: "minute",
  минуту: "minute",
  минуток: "minute",
  минутки: "minute",
  минутку: "minute",
  минуточек: "minute",
  минуточки: "minute",
  минуточку: "minute",
  час: "hour",
  часов: "hour",
  часа: "hour",
  часу: "hour",
  часиков: "hour",
  часика: "hour",
  часике: "hour",
  часик: "hour",
  день: "day",
  дня: "day",
  дней: "day",
  суток: "day",
  сутки: "day",
  неделя: "week",
  неделе: "week",
  недели: "week",
  неделю: "week",
  недель: "week",
  недельке: "week",
  недельки: "week",
  неделек: "week",
  месяц: "month",
  месяце: "month",
  месяцев: "month",
  месяца: "month",
  квартал: "quarter",
  квартале: "quarter",
  кварталов: "quarter",
  год: "year",
  года: "year",
  году: "year",
  годов: "year",
  лет: "year",
  годик: "year",
  годика: "year",
  годиков: "year"
};
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|\u043F\u043E\u043B|\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E|\u043F\u0430\u0440(?:\u044B|\u0443)|\\s{0,3})");
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  }
  if (num.match(/несколько/)) {
    return 3;
  } else if (num.match(/пол/)) {
    return 0.5;
  } else if (num.match(/пар/)) {
    return 2;
  } else if (num === "") {
    return 1;
  }
  return parseFloat(num);
}
var ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(ORDINAL_WORD_DICTIONARY), "|[0-9]{1,2}(?:\u0433\u043E|\u043E\u0433\u043E|\u0435|\u043E\u0435)?)");
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();
  if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
    return ORDINAL_WORD_DICTIONARY[num];
  }
  return parseInt(num);
}
var year = "(?:\\s+(?:году|года|год|г|г.))?";
var YEAR_PATTERN = exports.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}".concat(year, "\\s*(?:\u043D.\u044D.|\u0434\u043E \u043D.\u044D.|\u043D. \u044D.|\u0434\u043E \u043D. \u044D.)|[1-2][0-9]{3}").concat(year, "|[5-9][0-9]").concat(year, ")");
function parseYear(match) {
  if (/(год|года|г|г.)/i.test(match)) {
    match = match.replace(/(год|года|г|г.)/i, "");
  }
  if (/(до н.э.|до н. э.)/i.test(match)) {
    match = match.replace(/(до н.э.|до н. э.)/i, "");
    return -parseInt(match);
  }
  if (/(н. э.|н.э.)/i.test(match)) {
    match = match.replace(/(н. э.|н.э.)/i, "");
    return parseInt(match);
  }
  var rawYearNumber = parseInt(match);
  return (0, _years.findMostLikelyADYear)(rawYearNumber);
}
var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,3}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var TIME_UNITS_PATTERN = exports.TIME_UNITS_PATTERN = (0, _pattern.repeatedTimeunitPattern)("(?:(?:\u043E\u043A\u043E\u043B\u043E|\u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E)\\s{0,3})?", SINGLE_TIME_UNIT_PATTERN);
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