"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PATTERN = exports.WEEKDAY_DICTIONARY = exports.TIME_UNIT_DICTIONARY = exports.TIME_UNITS_PATTERN = exports.NUMBER_PATTERN = exports.MONTH_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = void 0;
exports.parseDuration = parseDuration;
exports.parseNumberPattern = parseNumberPattern;
exports.parseYear = parseYear;
var _pattern = require("../../utils/pattern.js");
var WEEKDAY_DICTIONARY = exports.WEEKDAY_DICTIONARY = {
  "domingo": 0,
  "dom": 0,
  "lunes": 1,
  "lun": 1,
  "martes": 2,
  "mar": 2,
  "miércoles": 3,
  "miercoles": 3,
  "mié": 3,
  "mie": 3,
  "jueves": 4,
  "jue": 4,
  "viernes": 5,
  "vie": 5,
  "sábado": 6,
  "sabado": 6,
  "sáb": 6,
  "sab": 6
};
var MONTH_DICTIONARY = exports.MONTH_DICTIONARY = {
  "enero": 1,
  "ene": 1,
  "ene.": 1,
  "febrero": 2,
  "feb": 2,
  "feb.": 2,
  "marzo": 3,
  "mar": 3,
  "mar.": 3,
  "abril": 4,
  "abr": 4,
  "abr.": 4,
  "mayo": 5,
  "may": 5,
  "may.": 5,
  "junio": 6,
  "jun": 6,
  "jun.": 6,
  "julio": 7,
  "jul": 7,
  "jul.": 7,
  "agosto": 8,
  "ago": 8,
  "ago.": 8,
  "septiembre": 9,
  "setiembre": 9,
  "sep": 9,
  "sep.": 9,
  "octubre": 10,
  "oct": 10,
  "oct.": 10,
  "noviembre": 11,
  "nov": 11,
  "nov.": 11,
  "diciembre": 12,
  "dic": 12,
  "dic.": 12
};
var INTEGER_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = {
  "uno": 1,
  "dos": 2,
  "tres": 3,
  "cuatro": 4,
  "cinco": 5,
  "seis": 6,
  "siete": 7,
  "ocho": 8,
  "nueve": 9,
  "diez": 10,
  "once": 11,
  "doce": 12,
  "trece": 13
};
var TIME_UNIT_DICTIONARY = exports.TIME_UNIT_DICTIONARY = {
  "sec": "second",
  "segundo": "second",
  "segundos": "second",
  "min": "minute",
  "mins": "minute",
  "minuto": "minute",
  "minutos": "minute",
  "h": "hour",
  "hr": "hour",
  "hrs": "hour",
  "hora": "hour",
  "horas": "hour",
  "día": "day",
  "días": "day",
  "semana": "week",
  "semanas": "week",
  "mes": "month",
  "meses": "month",
  "cuarto": "quarter",
  "cuartos": "quarter",
  "año": "year",
  "años": "year"
};
var NUMBER_PATTERN = exports.NUMBER_PATTERN = "(?:".concat((0, _pattern.matchAnyPattern)(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|un?|uno?|una?|algunos?|unos?|demi-?)");
function parseNumberPattern(match) {
  var num = match.toLowerCase();
  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  } else if (num === "un" || num === "una" || num === "uno") {
    return 1;
  } else if (num.match(/algunos?/)) {
    return 3;
  } else if (num.match(/unos?/)) {
    return 3;
  } else if (num.match(/media?/)) {
    return 0.5;
  }
  return parseFloat(num);
}
var YEAR_PATTERN = exports.YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)(?:\\s*[a|d]\\.?\\s*c\\.?|\\s*a\\.?\\s*d\\.?)?";
function parseYear(match) {
  if (match.match(/^[0-9]{1,4}$/)) {
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
  if (match.match(/a\.?\s*c\.?/i)) {
    match = match.replace(/a\.?\s*c\.?/i, "");
    return -parseInt(match);
  }
  return parseInt(match);
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