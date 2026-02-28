"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyDuration = void 0;
exports.addDuration = addDuration;
exports.reverseDuration = reverseDuration;
var EmptyDuration = exports.EmptyDuration = {
  day: 0,
  second: 0,
  millisecond: 0
};
function addDuration(ref, duration) {
  var date = new Date(ref);
  if (duration["y"]) {
    duration["year"] = duration["y"];
    delete duration["y"];
  }
  if (duration["mo"]) {
    duration["month"] = duration["mo"];
    delete duration["mo"];
  }
  if (duration["M"]) {
    duration["month"] = duration["M"];
    delete duration["M"];
  }
  if (duration["w"]) {
    duration["week"] = duration["w"];
    delete duration["w"];
  }
  if (duration["d"]) {
    duration["day"] = duration["d"];
    delete duration["d"];
  }
  if (duration["h"]) {
    duration["hour"] = duration["h"];
    delete duration["h"];
  }
  if (duration["m"]) {
    duration["minute"] = duration["m"];
    delete duration["m"];
  }
  if (duration["s"]) {
    duration["second"] = duration["s"];
    delete duration["s"];
  }
  if (duration["ms"]) {
    duration["millisecond"] = duration["ms"];
    delete duration["ms"];
  }
  if ("year" in duration) {
    var floor = Math.floor(duration["year"]);
    date.setFullYear(date.getFullYear() + floor);
    var remainingFraction = duration["year"] - floor;
    if (remainingFraction > 0) {
      var _duration$month;
      duration.month = (_duration$month = duration === null || duration === void 0 ? void 0 : duration.month) !== null && _duration$month !== void 0 ? _duration$month : 0;
      duration.month += remainingFraction * 12;
    }
  }
  if ("quarter" in duration) {
    var _floor = Math.floor(duration["quarter"]);
    date.setMonth(date.getMonth() + _floor * 3);
  }
  if ("month" in duration) {
    var _floor2 = Math.floor(duration["month"]);
    date.setMonth(date.getMonth() + _floor2);
    var _remainingFraction = duration["month"] - _floor2;
    if (_remainingFraction > 0) {
      var _duration$week;
      duration.week = (_duration$week = duration === null || duration === void 0 ? void 0 : duration.week) !== null && _duration$week !== void 0 ? _duration$week : 0;
      duration.week += _remainingFraction * 4;
    }
  }
  if ("week" in duration) {
    var _floor3 = Math.floor(duration["week"]);
    date.setDate(date.getDate() + _floor3 * 7);
    var _remainingFraction2 = duration["week"] - _floor3;
    if (_remainingFraction2 > 0) {
      var _duration$day;
      duration.day = (_duration$day = duration === null || duration === void 0 ? void 0 : duration.day) !== null && _duration$day !== void 0 ? _duration$day : 0;
      duration.day += Math.round(_remainingFraction2 * 7);
    }
  }
  if ("day" in duration) {
    var _floor4 = Math.floor(duration["day"]);
    date.setDate(date.getDate() + _floor4);
    var _remainingFraction3 = duration["day"] - _floor4;
    if (_remainingFraction3 > 0) {
      var _duration$hour;
      duration.hour = (_duration$hour = duration === null || duration === void 0 ? void 0 : duration.hour) !== null && _duration$hour !== void 0 ? _duration$hour : 0;
      duration.hour += Math.round(_remainingFraction3 * 24);
    }
  }
  if ("hour" in duration) {
    var _floor5 = Math.floor(duration["hour"]);
    date.setHours(date.getHours() + _floor5);
    var _remainingFraction4 = duration["hour"] - _floor5;
    if (_remainingFraction4 > 0) {
      var _duration$minute;
      duration.minute = (_duration$minute = duration === null || duration === void 0 ? void 0 : duration.minute) !== null && _duration$minute !== void 0 ? _duration$minute : 0;
      duration.minute += Math.round(_remainingFraction4 * 60);
    }
  }
  if ("minute" in duration) {
    var _floor6 = Math.floor(duration["minute"]);
    date.setMinutes(date.getMinutes() + _floor6);
    var _remainingFraction5 = duration["minute"] - _floor6;
    if (_remainingFraction5 > 0) {
      var _duration$second;
      duration.second = (_duration$second = duration === null || duration === void 0 ? void 0 : duration.second) !== null && _duration$second !== void 0 ? _duration$second : 0;
      duration.second += Math.round(_remainingFraction5 * 60);
    }
  }
  if ("second" in duration) {
    var _floor7 = Math.floor(duration["second"]);
    date.setSeconds(date.getSeconds() + _floor7);
    var _remainingFraction6 = duration["second"] - _floor7;
    if (_remainingFraction6 > 0) {
      var _duration$millisecond;
      duration.millisecond = (_duration$millisecond = duration === null || duration === void 0 ? void 0 : duration.millisecond) !== null && _duration$millisecond !== void 0 ? _duration$millisecond : 0;
      duration.millisecond += Math.round(_remainingFraction6 * 1000);
    }
  }
  if ("millisecond" in duration) {
    var _floor8 = Math.floor(duration["millisecond"]);
    date.setMilliseconds(date.getMilliseconds() + _floor8);
  }
  return date;
}
function reverseDuration(duration) {
  var reversed = {};
  for (var key in duration) {
    reversed[key] = -duration[key];
  }
  return reversed;
}