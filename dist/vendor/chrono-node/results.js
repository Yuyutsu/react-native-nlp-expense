"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceWithTimezone = exports.ParsingResult = exports.ParsingComponents = void 0;
var _dates = require("./utils/dates.js");
var _timezone = require("./timezone.js");
var _duration = require("./calculation/duration.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ReferenceWithTimezone = exports.ReferenceWithTimezone = /*#__PURE__*/function () {
  function ReferenceWithTimezone(instant, timezoneOffset) {
    _classCallCheck(this, ReferenceWithTimezone);
    _defineProperty(this, "instant", void 0);
    _defineProperty(this, "timezoneOffset", void 0);
    this.instant = instant !== null && instant !== void 0 ? instant : new Date();
    this.timezoneOffset = timezoneOffset !== null && timezoneOffset !== void 0 ? timezoneOffset : null;
  }
  return _createClass(ReferenceWithTimezone, [{
    key: "getDateWithAdjustedTimezone",
    value: function getDateWithAdjustedTimezone() {
      var date = new Date(this.instant);
      if (this.timezoneOffset !== null) {
        date.setMinutes(date.getMinutes() - this.getSystemTimezoneAdjustmentMinute(this.instant));
      }
      return date;
    }
  }, {
    key: "getSystemTimezoneAdjustmentMinute",
    value: function getSystemTimezoneAdjustmentMinute(date, overrideTimezoneOffset) {
      var _ref;
      if (!date || date.getTime() < 0) {
        date = new Date();
      }
      var currentTimezoneOffset = -date.getTimezoneOffset();
      var targetTimezoneOffset = (_ref = overrideTimezoneOffset !== null && overrideTimezoneOffset !== void 0 ? overrideTimezoneOffset : this.timezoneOffset) !== null && _ref !== void 0 ? _ref : currentTimezoneOffset;
      return currentTimezoneOffset - targetTimezoneOffset;
    }
  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      var _this$timezoneOffset;
      return (_this$timezoneOffset = this.timezoneOffset) !== null && _this$timezoneOffset !== void 0 ? _this$timezoneOffset : -this.instant.getTimezoneOffset();
    }
  }], [{
    key: "fromDate",
    value: function fromDate(date) {
      return new ReferenceWithTimezone(date);
    }
  }, {
    key: "fromInput",
    value: function fromInput(input, timezoneOverrides) {
      var _input$instant;
      if (input instanceof Date) {
        return ReferenceWithTimezone.fromDate(input);
      }
      var instant = (_input$instant = input === null || input === void 0 ? void 0 : input.instant) !== null && _input$instant !== void 0 ? _input$instant : new Date();
      var timezoneOffset = (0, _timezone.toTimezoneOffset)(input === null || input === void 0 ? void 0 : input.timezone, instant, timezoneOverrides);
      return new ReferenceWithTimezone(instant, timezoneOffset);
    }
  }]);
}();
var ParsingComponents = exports.ParsingComponents = /*#__PURE__*/function () {
  function ParsingComponents(reference, knownComponents) {
    _classCallCheck(this, ParsingComponents);
    _defineProperty(this, "knownValues", void 0);
    _defineProperty(this, "impliedValues", void 0);
    _defineProperty(this, "reference", void 0);
    _defineProperty(this, "_tags", new Set());
    this.reference = reference;
    this.knownValues = {};
    this.impliedValues = {};
    if (knownComponents) {
      for (var key in knownComponents) {
        this.knownValues[key] = knownComponents[key];
      }
    }
    var date = reference.getDateWithAdjustedTimezone();
    this.imply("day", date.getDate());
    this.imply("month", date.getMonth() + 1);
    this.imply("year", date.getFullYear());
    this.imply("hour", 12);
    this.imply("minute", 0);
    this.imply("second", 0);
    this.imply("millisecond", 0);
  }
  return _createClass(ParsingComponents, [{
    key: "get",
    value: function get(component) {
      if (component in this.knownValues) {
        return this.knownValues[component];
      }
      if (component in this.impliedValues) {
        return this.impliedValues[component];
      }
      return null;
    }
  }, {
    key: "isCertain",
    value: function isCertain(component) {
      return component in this.knownValues;
    }
  }, {
    key: "getCertainComponents",
    value: function getCertainComponents() {
      return Object.keys(this.knownValues);
    }
  }, {
    key: "imply",
    value: function imply(component, value) {
      if (component in this.knownValues) {
        return this;
      }
      this.impliedValues[component] = value;
      return this;
    }
  }, {
    key: "assign",
    value: function assign(component, value) {
      this.knownValues[component] = value;
      delete this.impliedValues[component];
      return this;
    }
  }, {
    key: "addDurationAsImplied",
    value: function addDurationAsImplied(duration) {
      var currentDate = this.dateWithoutTimezoneAdjustment();
      var date = (0, _duration.addDuration)(currentDate, duration);
      if ("day" in duration || "week" in duration || "month" in duration || "year" in duration) {
        this["delete"](["day", "weekday", "month", "year"]);
        this.imply("day", date.getDate());
        this.imply("weekday", date.getDay());
        this.imply("month", date.getMonth() + 1);
        this.imply("year", date.getFullYear());
      }
      if ("second" in duration || "minute" in duration || "hour" in duration) {
        this["delete"](["second", "minute", "hour"]);
        this.imply("second", date.getSeconds());
        this.imply("minute", date.getMinutes());
        this.imply("hour", date.getHours());
      }
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(components) {
      if (typeof components === "string") {
        components = [components];
      }
      var _iterator = _createForOfIteratorHelper(components),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var component = _step.value;
          delete this.knownValues[component];
          delete this.impliedValues[component];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var component = new ParsingComponents(this.reference);
      component.knownValues = {};
      component.impliedValues = {};
      for (var key in this.knownValues) {
        component.knownValues[key] = this.knownValues[key];
      }
      for (var _key in this.impliedValues) {
        component.impliedValues[_key] = this.impliedValues[_key];
      }
      return component;
    }
  }, {
    key: "isOnlyDate",
    value: function isOnlyDate() {
      return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
    }
  }, {
    key: "isOnlyTime",
    value: function isOnlyTime() {
      return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month") && !this.isCertain("year");
    }
  }, {
    key: "isOnlyWeekdayComponent",
    value: function isOnlyWeekdayComponent() {
      return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
    }
  }, {
    key: "isDateWithUnknownYear",
    value: function isDateWithUnknownYear() {
      return this.isCertain("month") && !this.isCertain("year");
    }
  }, {
    key: "isValidDate",
    value: function isValidDate() {
      var date = this.dateWithoutTimezoneAdjustment();
      if (date.getFullYear() !== this.get("year")) return false;
      if (date.getMonth() !== this.get("month") - 1) return false;
      if (date.getDate() !== this.get("day")) return false;
      if (this.get("hour") != null && date.getHours() != this.get("hour")) return false;
      if (this.get("minute") != null && date.getMinutes() != this.get("minute")) return false;
      return true;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[ParsingComponents {\n            tags: ".concat(JSON.stringify(Array.from(this._tags).sort()), ", \n            knownValues: ").concat(JSON.stringify(this.knownValues), ", \n            impliedValues: ").concat(JSON.stringify(this.impliedValues), "}, \n            reference: ").concat(JSON.stringify(this.reference), "]");
    }
  }, {
    key: "date",
    value: function date() {
      var date = this.dateWithoutTimezoneAdjustment();
      var timezoneAdjustment = this.reference.getSystemTimezoneAdjustmentMinute(date, this.get("timezoneOffset"));
      return new Date(date.getTime() + timezoneAdjustment * 60000);
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
      this._tags.add(tag);
      return this;
    }
  }, {
    key: "addTags",
    value: function addTags(tags) {
      var _iterator2 = _createForOfIteratorHelper(tags),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var tag = _step2.value;
          this._tags.add(tag);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return this;
    }
  }, {
    key: "tags",
    value: function tags() {
      return new Set(this._tags);
    }
  }, {
    key: "dateWithoutTimezoneAdjustment",
    value: function dateWithoutTimezoneAdjustment() {
      var date = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
      date.setFullYear(this.get("year"));
      return date;
    }
  }], [{
    key: "createRelativeFromReference",
    value: function createRelativeFromReference(reference) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _duration.EmptyDuration;
      var date = (0, _duration.addDuration)(reference.getDateWithAdjustedTimezone(), duration);
      var components = new ParsingComponents(reference);
      components.addTag("result/relativeDate");
      if ("hour" in duration || "minute" in duration || "second" in duration || "millisecond" in duration) {
        components.addTag("result/relativeDateAndTime");
        (0, _dates.assignSimilarTime)(components, date);
        (0, _dates.assignSimilarDate)(components, date);
        components.assign("timezoneOffset", reference.getTimezoneOffset());
      } else {
        (0, _dates.implySimilarTime)(components, date);
        components.imply("timezoneOffset", reference.getTimezoneOffset());
        if ("day" in duration) {
          components.assign("day", date.getDate());
          components.assign("month", date.getMonth() + 1);
          components.assign("year", date.getFullYear());
          components.assign("weekday", date.getDay());
        } else if ("week" in duration) {
          components.assign("day", date.getDate());
          components.assign("month", date.getMonth() + 1);
          components.assign("year", date.getFullYear());
          components.imply("weekday", date.getDay());
        } else {
          components.imply("day", date.getDate());
          if ("month" in duration) {
            components.assign("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
          } else {
            components.imply("month", date.getMonth() + 1);
            if ("year" in duration) {
              components.assign("year", date.getFullYear());
            } else {
              components.imply("year", date.getFullYear());
            }
          }
        }
      }
      return components;
    }
  }]);
}();
var ParsingResult = exports.ParsingResult = /*#__PURE__*/function () {
  function ParsingResult(reference, index, text, start, end) {
    _classCallCheck(this, ParsingResult);
    _defineProperty(this, "refDate", void 0);
    _defineProperty(this, "index", void 0);
    _defineProperty(this, "text", void 0);
    _defineProperty(this, "reference", void 0);
    _defineProperty(this, "start", void 0);
    _defineProperty(this, "end", void 0);
    this.reference = reference;
    this.refDate = reference.instant;
    this.index = index;
    this.text = text;
    this.start = start || new ParsingComponents(reference);
    this.end = end;
  }
  return _createClass(ParsingResult, [{
    key: "clone",
    value: function clone() {
      var result = new ParsingResult(this.reference, this.index, this.text);
      result.start = this.start ? this.start.clone() : null;
      result.end = this.end ? this.end.clone() : null;
      return result;
    }
  }, {
    key: "date",
    value: function date() {
      return this.start.date();
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
      this.start.addTag(tag);
      if (this.end) {
        this.end.addTag(tag);
      }
      return this;
    }
  }, {
    key: "addTags",
    value: function addTags(tags) {
      this.start.addTags(tags);
      if (this.end) {
        this.end.addTags(tags);
      }
      return this;
    }
  }, {
    key: "tags",
    value: function tags() {
      var combinedTags = new Set(this.start.tags());
      if (this.end) {
        var _iterator3 = _createForOfIteratorHelper(this.end.tags()),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var tag = _step3.value;
            combinedTags.add(tag);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return combinedTags;
    }
  }, {
    key: "toString",
    value: function toString() {
      var tags = Array.from(this.tags()).sort();
      return "[ParsingResult {index: ".concat(this.index, ", text: '").concat(this.text, "', tags: ").concat(JSON.stringify(tags), " ...}]");
    }
  }]);
}();