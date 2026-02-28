"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _abstractRefiners = require("../abstractRefiners.js");
var _duration = require("../../calculation/duration.js");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var AbstractMergeDateRangeRefiner = exports["default"] = /*#__PURE__*/function (_MergingRefiner) {
  function AbstractMergeDateRangeRefiner() {
    _classCallCheck(this, AbstractMergeDateRangeRefiner);
    return _callSuper(this, AbstractMergeDateRangeRefiner, arguments);
  }
  _inherits(AbstractMergeDateRangeRefiner, _MergingRefiner);
  return _createClass(AbstractMergeDateRangeRefiner, [{
    key: "shouldMergeResults",
    value: function shouldMergeResults(textBetween, currentResult, nextResult) {
      return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
    }
  }, {
    key: "mergeResults",
    value: function mergeResults(textBetween, fromResult, toResult) {
      if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
        toResult.start.getCertainComponents().forEach(function (key) {
          if (!fromResult.start.isCertain(key)) {
            fromResult.start.imply(key, toResult.start.get(key));
          }
        });
        fromResult.start.getCertainComponents().forEach(function (key) {
          if (!toResult.start.isCertain(key)) {
            toResult.start.imply(key, fromResult.start.get(key));
          }
        });
      }
      if (fromResult.start.date() > toResult.start.date()) {
        var fromDate = fromResult.start.date();
        var toDate = toResult.start.date();
        if (toResult.start.isOnlyWeekdayComponent() && (0, _duration.addDuration)(toDate, {
          day: 7
        }) > fromDate) {
          toDate = (0, _duration.addDuration)(toDate, {
            day: 7
          });
          toResult.start.imply("day", toDate.getDate());
          toResult.start.imply("month", toDate.getMonth() + 1);
          toResult.start.imply("year", toDate.getFullYear());
        } else if (fromResult.start.isOnlyWeekdayComponent() && (0, _duration.addDuration)(fromDate, {
          day: -7
        }) < toDate) {
          fromDate = (0, _duration.addDuration)(fromDate, {
            day: -7
          });
          fromResult.start.imply("day", fromDate.getDate());
          fromResult.start.imply("month", fromDate.getMonth() + 1);
          fromResult.start.imply("year", fromDate.getFullYear());
        } else if (toResult.start.isDateWithUnknownYear() && (0, _duration.addDuration)(toDate, {
          year: 1
        }) > fromDate) {
          toDate = (0, _duration.addDuration)(toDate, {
            year: 1
          });
          toResult.start.imply("year", toDate.getFullYear());
        } else if (fromResult.start.isDateWithUnknownYear() && (0, _duration.addDuration)(fromDate, {
          year: -1
        }) < toDate) {
          fromDate = (0, _duration.addDuration)(fromDate, {
            year: -1
          });
          fromResult.start.imply("year", fromDate.getFullYear());
        } else {
          var _ref = [fromResult, toResult];
          toResult = _ref[0];
          fromResult = _ref[1];
        }
      }
      var result = fromResult.clone();
      result.start = fromResult.start;
      result.end = toResult.start;
      result.index = Math.min(fromResult.index, toResult.index);
      if (fromResult.index < toResult.index) {
        result.text = fromResult.text + textBetween + toResult.text;
      } else {
        result.text = toResult.text + textBetween + fromResult.text;
      }
      return result;
    }
  }]);
}(_abstractRefiners.MergingRefiner);