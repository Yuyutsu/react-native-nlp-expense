"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMostLikelyADYear = findMostLikelyADYear;
exports.findYearClosestToRef = findYearClosestToRef;
var _duration = require("./duration.js");
function findMostLikelyADYear(yearNumber) {
  if (yearNumber < 100) {
    if (yearNumber > 50) {
      yearNumber = yearNumber + 1900;
    } else {
      yearNumber = yearNumber + 2000;
    }
  }
  return yearNumber;
}
function findYearClosestToRef(refDate, day, month) {
  var date = new Date(refDate);
  date.setMonth(month - 1);
  date.setDate(day);
  var nextYear = (0, _duration.addDuration)(date, {
    "year": 1
  });
  var lastYear = (0, _duration.addDuration)(date, {
    "year": -1
  });
  if (Math.abs(nextYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
    date = nextYear;
  } else if (Math.abs(lastYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
    date = lastYear;
  }
  return date.getFullYear();
}