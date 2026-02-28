"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParsingComponentsAtWeekday = createParsingComponentsAtWeekday;
exports.getBackwardDaysToWeekday = getBackwardDaysToWeekday;
exports.getDaysForwardToWeekday = getDaysForwardToWeekday;
exports.getDaysToWeekday = getDaysToWeekday;
exports.getDaysToWeekdayClosest = getDaysToWeekdayClosest;
var _types = require("../types.js");
var _results = require("../results.js");
function createParsingComponentsAtWeekday(reference, weekday, modifier) {
  var refDate = reference.getDateWithAdjustedTimezone();
  var daysToWeekday = getDaysToWeekday(refDate, weekday, modifier);
  var components = new _results.ParsingComponents(reference);
  components = components.addDurationAsImplied({
    day: daysToWeekday
  });
  components.assign("weekday", weekday);
  return components;
}
function getDaysToWeekday(refDate, weekday, modifier) {
  var refWeekday = refDate.getDay();
  switch (modifier) {
    case "this":
      return getDaysForwardToWeekday(refDate, weekday);
    case "last":
      return getBackwardDaysToWeekday(refDate, weekday);
    case "next":
      if (refWeekday == _types.Weekday.SUNDAY) {
        return weekday == _types.Weekday.SUNDAY ? 7 : weekday;
      }
      if (refWeekday == _types.Weekday.SATURDAY) {
        if (weekday == _types.Weekday.SATURDAY) return 7;
        if (weekday == _types.Weekday.SUNDAY) return 8;
        return 1 + weekday;
      }
      if (weekday < refWeekday && weekday != _types.Weekday.SUNDAY) {
        return getDaysForwardToWeekday(refDate, weekday);
      } else {
        return getDaysForwardToWeekday(refDate, weekday) + 7;
      }
  }
  return getDaysToWeekdayClosest(refDate, weekday);
}
function getDaysToWeekdayClosest(refDate, weekday) {
  var backward = getBackwardDaysToWeekday(refDate, weekday);
  var forward = getDaysForwardToWeekday(refDate, weekday);
  return forward < -backward ? forward : backward;
}
function getDaysForwardToWeekday(refDate, weekday) {
  var refWeekday = refDate.getDay();
  var forwardCount = weekday - refWeekday;
  if (forwardCount < 0) {
    forwardCount += 7;
  }
  return forwardCount;
}
function getBackwardDaysToWeekday(refDate, weekday) {
  var refWeekday = refDate.getDay();
  var backwardCount = weekday - refWeekday;
  if (backwardCount >= 0) {
    backwardCount -= 7;
  }
  return backwardCount;
}