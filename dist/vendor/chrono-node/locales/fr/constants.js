"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PATTERN = exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.ORDINAL_NUMBER_PATTERN = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = void 0;
exports.parseDuration = parseDuration;
exports.parseNumberPattern = parseNumberPattern;
exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
exports.parseYear = parseYear;
var _pattern = require("../../utils/pattern.js");
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  "dimanche": 0,
  "dim": 0,
  "lundi": 1,
  "lun": 1,
  "mardi": 2,
  "mar": 2,
  "mercredi": 3,
  "mer": 3,
  "jeudi": 4,
  "jeu": 4,
  "vendredi": 5,
  "ven": 5,
  "samedi": 6,
  "sam": 6
};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = {
  "janvier": 1,
  "jan": 1,
  "jan.": 1,
  "février": 2,
  "fév": 2,
  "fév.": 2,
  "fevrier": 2,
  "fev": 2,
  "fev.": 2,
  "mars": 3,
  "mar": 3,
  "mar.": 3,
  "avril": 4,
  "avr": 4,
  "avr.": 4,
  "mai": 5,
  "juin": 6,
  "jun": 6,
  "juillet": 7,
  "juil": 7,
  "jul": 7,
  "jul.": 7,
  "août": 8,
  "aout": 8,
  "septembre": 9,
  "sep": 9,
  "sep.": 9,
  "sept": 9,
  "sept.": 9,
  "octobre": 10,
  "oct": 10,
  "oct.": 10,
  "novembre": 11,
  "nov": 11,
  "nov.": 11,
  "décembre": 12,
  "decembre": 12,
  "dec": 12,
  "dec.": 12
};
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  "un": 1,
  "deux": 2,
  "trois": 3,
  "quatre": 4,
  "cinq": 5,
  "six": 6,
  "sept": 7,
  "huit": 8,
  "neuf": 9,
  "dix": 10,
  "onze": 11,
  "douze": 12,
  "treize": 13
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  "sec": "second",
  "seconde": "second",
  "secondes": "second",
  "min": "minute",
  "mins": "minute",
  "minute": "minute",
  "minutes": "minute",
  "h": "hour",
  "hr": "hour",
  "hrs": "hour",
  "heure": "hour",
  "heures": "hour",
  "jour": "day",
  "jours": "day",
  "semaine": "week",
  "semaines": "week",
  "mois": "month",
  "trimestre": "quarter",
  "trimestres": "quarter",
  "ans": "year",
  "année": "year",
  "années": "year"
};
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|une?\\b|quelques?|demi-?)");
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  } else if (num === "une" || num === "un") {
    return 1;
  } else if (num.match(/quelques?/)) {
    return 3;
  } else if (num.match(/demi-?/)) {
    return 0.5;
  }
  return parseFloat(num);
}
var ORDINAL_NUMBER_PATTERN = exports.ORDINAL_NUMBER_PATTERN = "(?:[0-9]{1,2}(?:er)?)";
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();
  num = num.replace(/(?:er)$/i, "");
  return parseInt(num);
}
var YEAR_PATTERN = exports.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s*(?:AC|AD|p\\.\\s*C(?:hr?)?\\.\\s*n\\.)|[1-2][0-9]{3}|[5-9][0-9])";
function parseYear(match) {
  if (/AC/i.test(match)) {
    match = match.replace(/BC/i, "");
    return -parseInt(match);
  }
  if (/AD/i.test(match) || /C/i.test(match)) {
    match = match.replace(/[^\d]+/i, "");
    return parseInt(match);
  }
  var yearNumber = parseInt(match);
  if (yearNumber < 100) {
    if (yearNumber > 50) {
      yearNumber = yearNumber + 1900;
    } else {
      yearNumber = yearNumber + 2000;
    }
  }
  return yearNumber;
}
var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s{0,5}(").concat((0, _pattern.matchAnyPattern)(TIME_UNIT_DICTIONARY), ")\\s{0,5}");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
var TIME_UNITS_PATTERN = exports.TIME_UNITS_PATTERN = (0, _pattern.repeatedTimeunitPattern)("", SINGLE_TIME_UNIT_PATTERN);
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