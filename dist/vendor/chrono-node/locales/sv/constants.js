"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_PATTERN = exports.TIME_UNIT_NO_ABBR_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.TIME_UNITS_NO_ABBR_PATTERN = exports.ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_DICTIONARY = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = void 0;
exports.parseDuration = parseDuration;
exports.parseNumberPattern = parseNumberPattern;
exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
exports.parseYear = parseYear;
var _pattern = require("../../utils/pattern.js");
var _years = require("../../calculation/years.js");
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  "söndag": 0,
  "sön": 0,
  "so": 0,
  "måndag": 1,
  "mån": 1,
  "må": 1,
  "tisdag": 2,
  "tis": 2,
  "ti": 2,
  "onsdag": 3,
  "ons": 3,
  "on": 3,
  "torsdag": 4,
  "tors": 4,
  "to": 4,
  "fredag": 5,
  "fre": 5,
  "fr": 5,
  "lördag": 6,
  "lör": 6,
  "lö": 6
};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = {
  "januari": 1,
  "jan": 1,
  "jan.": 1,
  "februari": 2,
  "feb": 2,
  "feb.": 2,
  "mars": 3,
  "mar": 3,
  "mar.": 3,
  "april": 4,
  "apr": 4,
  "apr.": 4,
  "maj": 5,
  "juni": 6,
  "jun": 6,
  "jun.": 6,
  "juli": 7,
  "jul": 7,
  "jul.": 7,
  "augusti": 8,
  "aug": 8,
  "aug.": 8,
  "september": 9,
  "sep": 9,
  "sep.": 9,
  "sept": 9,
  "oktober": 10,
  "okt": 10,
  "okt.": 10,
  "november": 11,
  "nov": 11,
  "nov.": 11,
  "december": 12,
  "dec": 12,
  "dec.": 12
};
var ORDINAL_NUMBER_DICTIONARY = exports.ORDINAL_NUMBER_DICTIONARY = {
  "första": 1,
  "andra": 2,
  "tredje": 3,
  "fjärde": 4,
  "femte": 5,
  "sjätte": 6,
  "sjunde": 7,
  "åttonde": 8,
  "nionde": 9,
  "tionde": 10,
  "elfte": 11,
  "tolfte": 12,
  "trettonde": 13,
  "fjortonde": 14,
  "femtonde": 15,
  "sextonde": 16,
  "sjuttonde": 17,
  "artonde": 18,
  "nittonde": 19,
  "tjugonde": 20,
  "tjugoförsta": 21,
  "tjugoandra": 22,
  "tjugotredje": 23,
  "tjugofjärde": 24,
  "tjugofemte": 25,
  "tjugosjätte": 26,
  "tjugosjunde": 27,
  "tjugoåttonde": 28,
  "tjugonionde": 29,
  "trettionde": 30,
  "trettioförsta": 31
};
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  "en": 1,
  "ett": 1,
  "två": 2,
  "tre": 3,
  "fyra": 4,
  "fem": 5,
  "sex": 6,
  "sju": 7,
  "åtta": 8,
  "nio": 9,
  "tio": 10,
  "elva": 11,
  "tolv": 12,
  "tretton": 13,
  "fjorton": 14,
  "femton": 15,
  "sexton": 16,
  "sjutton": 17,
  "arton": 18,
  "nitton": 19,
  "tjugo": 20,
  "trettiо": 30,
  "fyrtio": 40,
  "femtio": 50,
  "sextio": 60,
  "sjuttio": 70,
  "åttio": 80,
  "nittio": 90,
  "hundra": 100,
  "tusen": 1000
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  "sek": "second",
  "sekund": "second",
  "sekunder": "second",
  "min": "minute",
  "minut": "minute",
  "minuter": "minute",
  "tim": "hour",
  "timme": "hour",
  "timmar": "hour",
  "dag": "day",
  "dagar": "day",
  "vecka": "week",
  "veckor": "week",
  "mån": "month",
  "månad": "month",
  "månader": "month",
  "år": "year",
  "kvartаl": "quarter",
  "kvartal": "quarter"
};
var TIME_UNIT_NO_ABBR_DICTIONARY = exports.TIME_UNIT_NO_ABBR_DICTIONARY = {
  "sekund": "second",
  "sekunder": "second",
  "minut": "minute",
  "minuter": "minute",
  "timme": "hour",
  "timmar": "hour",
  "dag": "day",
  "dagar": "day",
  "vecka": "week",
  "veckor": "week",
  "månad": "month",
  "månader": "month",
  "år": "year",
  "kvartal": "quarter"
};
function parseDuration(timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  while (match) {
    collectDateTimeFragment(fragments, match);
    remainingText = remainingText.substring(match[0].length);
    match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  }
  return fragments;
}
function collectDateTimeFragment(fragments, match) {
  var num = parseNumberPattern(match[1]);
  var unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
  fragments[unit] = num;
}
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|\\d+)");
var ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(ORDINAL_NUMBER_DICTIONARY), "|\\d{1,2}(?:e|:e))");
var TIME_UNIT_PATTERN = exports.TIME_UNIT_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")");
var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,5}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")\\s{0,5}");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var SINGLE_TIME_UNIT_NO_ABBR_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,5}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_NO_ABBR_DICTIONARY), ")\\s{0,5}");
var TIME_UNITS_PATTERN = exports.TIME_UNITS_PATTERN = (0, _pattern.repeatedTimeunitPattern)("", SINGLE_TIME_UNIT_PATTERN);
var TIME_UNITS_NO_ABBR_PATTERN = exports.TIME_UNITS_NO_ABBR_PATTERN = (0, _pattern.repeatedTimeunitPattern)("", SINGLE_TIME_UNIT_NO_ABBR_PATTERN);
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  }
  return parseInt(num);
}
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();
  if (ORDINAL_NUMBER_DICTIONARY[num] !== undefined) {
    return ORDINAL_NUMBER_DICTIONARY[num];
  }
  return parseInt(num);
}
function parseYear(match) {
  if (/\d+/.test(match)) {
    var yearNumber = parseInt(match);
    if (yearNumber < 100) {
      yearNumber = (0, _years.findMostLikelyADYear)(yearNumber);
    }
    return yearNumber;
  }
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  }
  return parseInt(match);
}