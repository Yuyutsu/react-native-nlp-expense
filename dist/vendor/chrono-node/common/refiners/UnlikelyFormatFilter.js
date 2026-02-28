"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _abstractRefiners = require("../abstractRefiners.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UnlikelyFormatFilter = exports["default"] = /*#__PURE__*/function (_Filter) {
  function UnlikelyFormatFilter(strictMode) {
    var _this;
    _classCallCheck(this, UnlikelyFormatFilter);
    _this = _callSuper(this, UnlikelyFormatFilter);
    _defineProperty(_this, "strictMode", void 0);
    _this.strictMode = strictMode;
    return _this;
  }
  _inherits(UnlikelyFormatFilter, _Filter);
  return _createClass(UnlikelyFormatFilter, [{
    key: "isValid",
    value: function isValid(context, result) {
      if (result.text.replace(" ", "").match(/^\d*(\.\d*)?$/)) {
        context.debug(function () {
          console.log("Removing unlikely result '".concat(result.text, "'"));
        });
        return false;
      }
      if (!result.start.isValidDate()) {
        context.debug(function () {
          console.log("Removing invalid result: ".concat(result, " (").concat(result.start, ")"));
        });
        return false;
      }
      if (result.end && !result.end.isValidDate()) {
        context.debug(function () {
          console.log("Removing invalid result: ".concat(result, " (").concat(result.end, ")"));
        });
        return false;
      }
      if (this.strictMode) {
        return this.isStrictModeValid(context, result);
      }
      return true;
    }
  }, {
    key: "isStrictModeValid",
    value: function isStrictModeValid(context, result) {
      if (result.start.isOnlyWeekdayComponent()) {
        context.debug(function () {
          console.log("(Strict) Removing weekday only component: ".concat(result, " (").concat(result.end, ")"));
        });
        return false;
      }
      return true;
    }
  }]);
}(_abstractRefiners.Filter);