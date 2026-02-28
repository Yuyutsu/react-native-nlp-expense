"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractParserWithWordBoundaryChecking = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractParserWithWordBoundaryChecking = exports.AbstractParserWithWordBoundaryChecking = /*#__PURE__*/function () {
  function AbstractParserWithWordBoundaryChecking() {
    _classCallCheck(this, AbstractParserWithWordBoundaryChecking);
    _defineProperty(this, "cachedInnerPattern", null);
    _defineProperty(this, "cachedPattern", null);
  }
  return _createClass(AbstractParserWithWordBoundaryChecking, [{
    key: "innerPatternHasChange",
    value: function innerPatternHasChange(context, currentInnerPattern) {
      return this.innerPattern(context) !== currentInnerPattern;
    }
  }, {
    key: "patternLeftBoundary",
    value: function patternLeftBoundary() {
      return "(\\W|^)";
    }
  }, {
    key: "pattern",
    value: function pattern(context) {
      if (this.cachedInnerPattern) {
        if (!this.innerPatternHasChange(context, this.cachedInnerPattern)) {
          return this.cachedPattern;
        }
      }
      this.cachedInnerPattern = this.innerPattern(context);
      this.cachedPattern = new RegExp("".concat(this.patternLeftBoundary()).concat(this.cachedInnerPattern.source), this.cachedInnerPattern.flags);
      return this.cachedPattern;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var _match$;
      var header = (_match$ = match[1]) !== null && _match$ !== void 0 ? _match$ : "";
      match.index = match.index + header.length;
      match[0] = match[0].substring(header.length);
      for (var i = 2; i < match.length; i++) {
        match[i - 1] = match[i];
      }
      return this.innerExtract(context, match);
    }
  }]);
}();