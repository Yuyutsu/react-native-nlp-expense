"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractTimeExpressionParser = void 0;
var _types = require("../../types.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function primaryTimePattern(leftBoundary, primaryPrefix, primarySuffix, flags) {
  return new RegExp("".concat(leftBoundary) + "".concat(primaryPrefix) + "(\\d{1,4})" + "(?:" + "(?:\\.|:|\uFF1A)" + "(\\d{1,2})" + "(?:" + "(?::|\uFF1A)" + "(\\d{2})" + "(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?" + "".concat(primarySuffix), flags);
}
function followingTimePatten(followingPhase, followingSuffix) {
  return new RegExp("^(".concat(followingPhase, ")") + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\\uFF1A)" + "(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\\uFF1A)" + "(\\d{1,2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?" + "".concat(followingSuffix), "i");
}
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var MILLI_SECOND_GROUP = 5;
var AM_PM_HOUR_GROUP = 6;
var AbstractTimeExpressionParser = exports.AbstractTimeExpressionParser = /*#__PURE__*/function () {
  function AbstractTimeExpressionParser() {
    var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _classCallCheck(this, AbstractTimeExpressionParser);
    _defineProperty(this, "strictMode", void 0);
    _defineProperty(this, "cachedPrimaryPrefix", null);
    _defineProperty(this, "cachedPrimarySuffix", null);
    _defineProperty(this, "cachedPrimaryTimePattern", null);
    _defineProperty(this, "cachedFollowingPhase", null);
    _defineProperty(this, "cachedFollowingSuffix", null);
    _defineProperty(this, "cachedFollowingTimePatten", null);
    this.strictMode = strictMode;
  }
  return _createClass(AbstractTimeExpressionParser, [{
    key: "patternFlags",
    value: function patternFlags() {
      return "i";
    }
  }, {
    key: "primaryPatternLeftBoundary",
    value: function primaryPatternLeftBoundary() {
      return "(^|\\s|T|\\b)";
    }
  }, {
    key: "primarySuffix",
    value: function primarySuffix() {
      return "(?!/)(?=\\W|$)";
    }
  }, {
    key: "followingSuffix",
    value: function followingSuffix() {
      return "(?!/)(?=\\W|$)";
    }
  }, {
    key: "pattern",
    value: function pattern(context) {
      return this.getPrimaryTimePatternThroughCache();
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var startComponents = this.extractPrimaryTimeComponents(context, match);
      if (!startComponents) {
        if (match[0].match(/^\d{4}/)) {
          match.index += 4;
          return null;
        }
        match.index += match[0].length;
        return null;
      }
      var index = match.index + match[1].length;
      var text = match[0].substring(match[1].length);
      var result = context.createParsingResult(index, text, startComponents);
      match.index += match[0].length;
      var remainingText = context.text.substring(match.index);
      var followingPattern = this.getFollowingTimePatternThroughCache();
      var followingMatch = followingPattern.exec(remainingText);
      if (text.match(/^\d{3,4}/) && followingMatch) {
        if (followingMatch[0].match(/^\s*([+-])\s*\d{2,4}$/)) {
          return null;
        }
        if (followingMatch[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/)) {
          return null;
        }
      }
      if (!followingMatch || followingMatch[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
        return this.checkAndReturnWithoutFollowingPattern(result);
      }
      result.end = this.extractFollowingTimeComponents(context, followingMatch, result);
      if (result.end) {
        result.text += followingMatch[0];
      }
      return this.checkAndReturnWithFollowingPattern(result);
    }
  }, {
    key: "extractPrimaryTimeComponents",
    value: function extractPrimaryTimeComponents(context, match) {
      var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var components = context.createParsingComponents();
      var minute = 0;
      var meridiem = null;
      var hour = parseInt(match[HOUR_GROUP]);
      if (hour > 100) {
        if (match[HOUR_GROUP].length == 4 && match[MINUTE_GROUP] == null && !match[AM_PM_HOUR_GROUP]) {
          return null;
        }
        if (this.strictMode || match[MINUTE_GROUP] != null) {
          return null;
        }
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (hour > 24) {
        return null;
      }
      if (match[MINUTE_GROUP] != null) {
        if (match[MINUTE_GROUP].length == 1 && !match[AM_PM_HOUR_GROUP]) {
          return null;
        }
        minute = parseInt(match[MINUTE_GROUP]);
      }
      if (minute >= 60) {
        return null;
      }
      if (hour > 12) {
        meridiem = _types.Meridiem.PM;
      }
      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) return null;
        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = _types.Meridiem.AM;
          if (hour == 12) {
            hour = 0;
          }
        }
        if (ampm == "p") {
          meridiem = _types.Meridiem.PM;
          if (hour != 12) {
            hour += 12;
          }
        }
      }
      components.assign("hour", hour);
      components.assign("minute", minute);
      if (meridiem !== null) {
        components.assign("meridiem", meridiem);
      } else {
        if (hour < 12) {
          components.imply("meridiem", _types.Meridiem.AM);
        } else {
          components.imply("meridiem", _types.Meridiem.PM);
        }
      }
      if (match[MILLI_SECOND_GROUP] != null) {
        var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1000) return null;
        components.assign("millisecond", millisecond);
      }
      if (match[SECOND_GROUP] != null) {
        var second = parseInt(match[SECOND_GROUP]);
        if (second >= 60) return null;
        components.assign("second", second);
      }
      return components;
    }
  }, {
    key: "extractFollowingTimeComponents",
    value: function extractFollowingTimeComponents(context, match, result) {
      var components = context.createParsingComponents();
      if (match[MILLI_SECOND_GROUP] != null) {
        var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1000) return null;
        components.assign("millisecond", millisecond);
      }
      if (match[SECOND_GROUP] != null) {
        var second = parseInt(match[SECOND_GROUP]);
        if (second >= 60) return null;
        components.assign("second", second);
      }
      var hour = parseInt(match[HOUR_GROUP]);
      var minute = 0;
      var meridiem = -1;
      if (match[MINUTE_GROUP] != null) {
        minute = parseInt(match[MINUTE_GROUP]);
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }
      if (minute >= 60 || hour > 24) {
        return null;
      }
      if (hour >= 12) {
        meridiem = _types.Meridiem.PM;
      }
      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) {
          return null;
        }
        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
        if (ampm == "a") {
          meridiem = _types.Meridiem.AM;
          if (hour == 12) {
            hour = 0;
            if (!components.isCertain("day")) {
              components.imply("day", components.get("day") + 1);
            }
          }
        }
        if (ampm == "p") {
          meridiem = _types.Meridiem.PM;
          if (hour != 12) hour += 12;
        }
        if (!result.start.isCertain("meridiem")) {
          if (meridiem == _types.Meridiem.AM) {
            result.start.imply("meridiem", _types.Meridiem.AM);
            if (result.start.get("hour") == 12) {
              result.start.assign("hour", 0);
            }
          } else {
            result.start.imply("meridiem", _types.Meridiem.PM);
            if (result.start.get("hour") != 12) {
              result.start.assign("hour", result.start.get("hour") + 12);
            }
          }
        }
      }
      components.assign("hour", hour);
      components.assign("minute", minute);
      if (meridiem >= 0) {
        components.assign("meridiem", meridiem);
      } else {
        var startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
        if (startAtPM) {
          if (result.start.get("hour") - 12 > hour) {
            components.imply("meridiem", _types.Meridiem.AM);
          } else if (hour <= 12) {
            components.assign("hour", hour + 12);
            components.assign("meridiem", _types.Meridiem.PM);
          }
        } else if (hour > 12) {
          components.imply("meridiem", _types.Meridiem.PM);
        } else if (hour <= 12) {
          components.imply("meridiem", _types.Meridiem.AM);
        }
      }
      if (components.date().getTime() < result.start.date().getTime()) {
        components.imply("day", components.get("day") + 1);
      }
      return components;
    }
  }, {
    key: "checkAndReturnWithoutFollowingPattern",
    value: function checkAndReturnWithoutFollowingPattern(result) {
      if (result.text.match(/^\d$/)) {
        return null;
      }
      if (result.text.match(/^\d\d\d+$/)) {
        return null;
      }
      if (result.text.match(/\d[apAP]$/)) {
        return null;
      }
      var endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)$/);
      if (endingWithNumbers) {
        var endingNumbers = endingWithNumbers[1];
        if (this.strictMode) {
          return null;
        }
        if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
          return null;
        }
        var endingNumberVal = parseInt(endingNumbers);
        if (endingNumberVal > 24) {
          return null;
        }
      }
      return result;
    }
  }, {
    key: "checkAndReturnWithFollowingPattern",
    value: function checkAndReturnWithFollowingPattern(result) {
      if (result.text.match(/^\d+-\d+$/)) {
        return null;
      }
      var endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
      if (endingWithNumbers) {
        if (this.strictMode) {
          return null;
        }
        var startingNumbers = endingWithNumbers[1];
        var endingNumbers = endingWithNumbers[2];
        if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
          return null;
        }
        var endingNumberVal = parseInt(endingNumbers);
        var startingNumberVal = parseInt(startingNumbers);
        if (endingNumberVal > 24 || startingNumberVal > 24) {
          return null;
        }
      }
      return result;
    }
  }, {
    key: "getPrimaryTimePatternThroughCache",
    value: function getPrimaryTimePatternThroughCache() {
      var primaryPrefix = this.primaryPrefix();
      var primarySuffix = this.primarySuffix();
      if (this.cachedPrimaryPrefix === primaryPrefix && this.cachedPrimarySuffix === primarySuffix) {
        return this.cachedPrimaryTimePattern;
      }
      this.cachedPrimaryTimePattern = primaryTimePattern(this.primaryPatternLeftBoundary(), primaryPrefix, primarySuffix, this.patternFlags());
      this.cachedPrimaryPrefix = primaryPrefix;
      this.cachedPrimarySuffix = primarySuffix;
      return this.cachedPrimaryTimePattern;
    }
  }, {
    key: "getFollowingTimePatternThroughCache",
    value: function getFollowingTimePatternThroughCache() {
      var followingPhase = this.followingPhase();
      var followingSuffix = this.followingSuffix();
      if (this.cachedFollowingPhase === followingPhase && this.cachedFollowingSuffix === followingSuffix) {
        return this.cachedFollowingTimePatten;
      }
      this.cachedFollowingTimePatten = followingTimePatten(followingPhase, followingSuffix);
      this.cachedFollowingPhase = followingPhase;
      this.cachedFollowingSuffix = followingSuffix;
      return this.cachedFollowingTimePatten;
    }
  }]);
}();