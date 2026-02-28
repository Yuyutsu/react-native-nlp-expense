"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEEKDAY_OFFSET = exports.NUMBER = void 0;
exports.jaStringToNumber = jaStringToNumber;
exports.toHankaku = toHankaku;
var NUMBER = exports.NUMBER = {
  "零": 0,
  "〇": 0,
  "一": 1,
  "二": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9,
  "十": 10
};
var WEEKDAY_OFFSET = exports.WEEKDAY_OFFSET = {
  "日": 0,
  "月": 1,
  "火": 2,
  "水": 3,
  "木": 4,
  "金": 5,
  "土": 6
};
function toHankaku(text) {
  return String(text).replace(/\u2019/g, "'").replace(/\u201D/g, "\"").replace(/\u3000/g, " ").replace(/\uFFE5/g, "\xA5").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
}
function alphaNum(token) {
  return String.fromCharCode(token.charCodeAt(0) - 65248);
}
function jaStringToNumber(text) {
  var number = 0;
  for (var i = 0; i < text.length; i++) {
    var _char = text[i];
    if (_char === "十") {
      number = number === 0 ? NUMBER[_char] : number * NUMBER[_char];
    } else {
      number += NUMBER[_char];
    }
  }
  return number;
}