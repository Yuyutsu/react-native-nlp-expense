"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afternoon = afternoon;
exports.evening = evening;
exports.lastNight = lastNight;
exports.midnight = midnight;
exports.morning = morning;
exports.noon = noon;
exports.now = now;
exports.theDayAfter = theDayAfter;
exports.theDayBefore = theDayBefore;
exports.today = today;
exports.tomorrow = tomorrow;
exports.tonight = tonight;
exports.yesterday = yesterday;
exports.yesterdayEvening = yesterdayEvening;
var _results = require("../results.js");
var _dates = require("../utils/dates.js");
var _types = require("../types.js");
function now(reference) {
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  (0, _dates.assignSimilarDate)(component, targetDate);
  (0, _dates.assignSimilarTime)(component, targetDate);
  component.assign("timezoneOffset", reference.getTimezoneOffset());
  component.addTag("casualReference/now");
  return component;
}
function today(reference) {
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  (0, _dates.assignSimilarDate)(component, targetDate);
  (0, _dates.implySimilarTime)(component, targetDate);
  component["delete"]("meridiem");
  component.addTag("casualReference/today");
  return component;
}
function yesterday(reference) {
  return theDayBefore(reference, 1).addTag("casualReference/yesterday");
}
function tomorrow(reference) {
  return theDayAfter(reference, 1).addTag("casualReference/tomorrow");
}
function theDayBefore(reference, numDay) {
  return theDayAfter(reference, -numDay);
}
function theDayAfter(reference, nDays) {
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  var newDate = new Date(targetDate.getTime());
  newDate.setDate(newDate.getDate() + nDays);
  (0, _dates.assignSimilarDate)(component, newDate);
  (0, _dates.implySimilarTime)(component, newDate);
  component["delete"]("meridiem");
  return component;
}
function tonight(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 22;
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  (0, _dates.assignSimilarDate)(component, targetDate);
  component.imply("hour", implyHour);
  component.imply("meridiem", _types.Meridiem.PM);
  component.addTag("casualReference/tonight");
  return component;
}
function lastNight(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  if (targetDate.getHours() < 6) {
    targetDate = new Date(targetDate.getTime() - 24 * 60 * 60 * 1000);
  }
  (0, _dates.assignSimilarDate)(component, targetDate);
  component.imply("hour", implyHour);
  return component;
}
function evening(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var component = new _results.ParsingComponents(reference, {});
  component.imply("meridiem", _types.Meridiem.PM);
  component.imply("hour", implyHour);
  component.addTag("casualReference/evening");
  return component;
}
function yesterdayEvening(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var targetDate = reference.getDateWithAdjustedTimezone();
  var component = new _results.ParsingComponents(reference, {});
  targetDate = new Date(targetDate.getTime() - 24 * 60 * 60 * 1000);
  (0, _dates.assignSimilarDate)(component, targetDate);
  component.imply("hour", implyHour);
  component.imply("meridiem", _types.Meridiem.PM);
  component.addTag("casualReference/yesterday");
  component.addTag("casualReference/evening");
  return component;
}
function midnight(reference) {
  var component = new _results.ParsingComponents(reference, {});
  if (reference.getDateWithAdjustedTimezone().getHours() > 2) {
    component.addDurationAsImplied({
      day: 1
    });
  }
  component.assign("hour", 0);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/midnight");
  return component;
}
function morning(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var component = new _results.ParsingComponents(reference, {});
  component.imply("meridiem", _types.Meridiem.AM);
  component.imply("hour", implyHour);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/morning");
  return component;
}
function afternoon(reference) {
  var implyHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var component = new _results.ParsingComponents(reference, {});
  component.imply("meridiem", _types.Meridiem.PM);
  component.imply("hour", implyHour);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/afternoon");
  return component;
}
function noon(reference) {
  var component = new _results.ParsingComponents(reference, {});
  component.imply("meridiem", _types.Meridiem.AM);
  component.assign("hour", 12);
  component.imply("minute", 0);
  component.imply("second", 0);
  component.imply("millisecond", 0);
  component.addTag("casualReference/noon");
  return component;
}