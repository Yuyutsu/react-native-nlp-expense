"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEEKDAY_OFFSET = exports.NUMBER = void 0;
exports.zhStringToNumber = zhStringToNumber;
exports.zhStringToYear = zhStringToYear;
var NUMBER = exports.NUMBER = {
  "零": 0,
  "一": 1,
  "二": 2,
  "兩": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9,
  "十": 10,
  "廿": 20,
  "卅": 30
};
var WEEKDAY_OFFSET = exports.WEEKDAY_OFFSET = {
  "天": 0,
  "日": 0,
  "一": 1,
  "二": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6
};
function zhStringToNumber(text) {
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
function zhStringToYear(text) {
  var string = "";
  for (var i = 0; i < text.length; i++) {
    var _char2 = text[i];
    string = string + NUMBER[_char2];
  }
  return parseInt(string);
}