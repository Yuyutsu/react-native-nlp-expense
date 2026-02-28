"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dates = _interopRequireWildcard(require("../../utils/dates.js"));
var dates = _dates;
var _duration = require("../../calculation/duration.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ForwardDateRefiner = exports["default"] = /*#__PURE__*/function () {
  function ForwardDateRefiner() {
    _classCallCheck(this, ForwardDateRefiner);
  }
  return _createClass(ForwardDateRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var _this = this;
      if (!context.option.forwardDate) {
        return results;
      }
      results.forEach(function (result) {
        var refDate = context.reference.getDateWithAdjustedTimezone();
        if (result.start.isOnlyTime() && context.reference.instant > result.start.date()) {
          var _refDate = context.reference.getDateWithAdjustedTimezone();
          var refFollowingDay = new Date(_refDate);
          refFollowingDay.setDate(refFollowingDay.getDate() + 1);
          dates.implySimilarDate(result.start, refFollowingDay);
          context.debug(function () {
            console.log("".concat(_this.constructor.name, " adjusted ").concat(result, " time from the ref date (").concat(_refDate, ") to the following day (").concat(refFollowingDay, ")"));
          });
          if (result.end && result.end.isOnlyTime()) {
            dates.implySimilarDate(result.end, refFollowingDay);
            if (result.start.date() > result.end.date()) {
              refFollowingDay.setDate(refFollowingDay.getDate() + 1);
              dates.implySimilarDate(result.end, refFollowingDay);
            }
          }
        }
        if (result.start.isOnlyWeekdayComponent() && refDate > result.start.date()) {
          var daysToAdd = result.start.get("weekday") - refDate.getDay();
          if (daysToAdd <= 0) {
            daysToAdd += 7;
          }
          refDate = (0, _duration.addDuration)(refDate, {
            day: daysToAdd
          });
          (0, _dates.implySimilarDate)(result.start, refDate);
          context.debug(function () {
            console.log("".concat(_this.constructor.name, " adjusted ").concat(result, " weekday (").concat(result.start, ")"));
          });
          if (result.end && result.end.isOnlyWeekdayComponent()) {
            var _daysToAdd = result.end.get("weekday") - refDate.getDay();
            if (_daysToAdd <= 0) {
              _daysToAdd += 7;
            }
            refDate = (0, _duration.addDuration)(refDate, {
              day: _daysToAdd
            });
            (0, _dates.implySimilarDate)(result.end, refDate);
            context.debug(function () {
              console.log("".concat(_this.constructor.name, " adjusted ").concat(result, " weekday (").concat(result.end, ")"));
            });
          }
        }
        if (result.start.isDateWithUnknownYear() && refDate > result.start.date()) {
          for (var i = 0; i < 3 && refDate > result.start.date(); i++) {
            result.start.imply("year", result.start.get("year") + 1);
            context.debug(function () {
              console.log("".concat(_this.constructor.name, " adjusted ").concat(result, " year (").concat(result.start, ")"));
            });
            if (result.end && !result.end.isCertain("year")) {
              result.end.imply("year", result.end.get("year") + 1);
              context.debug(function () {
                console.log("".concat(_this.constructor.name, " adjusted ").concat(result, " month (").concat(result.start, ")"));
              });
            }
          }
        }
      });
      return results;
    }
  }]);
}();