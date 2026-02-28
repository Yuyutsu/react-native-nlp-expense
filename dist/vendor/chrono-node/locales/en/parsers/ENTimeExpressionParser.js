"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _types = require("../../../types.js");
var _AbstractTimeExpressionParser = require("../../../common/parsers/AbstractTimeExpressionParser.js");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ENTimeExpressionParser = exports["default"] = /*#__PURE__*/function (_AbstractTimeExpressi) {
  function ENTimeExpressionParser(strictMode) {
    _classCallCheck(this, ENTimeExpressionParser);
    return _callSuper(this, ENTimeExpressionParser, [strictMode]);
  }
  _inherits(ENTimeExpressionParser, _AbstractTimeExpressi);
  return _createClass(ENTimeExpressionParser, [{
    key: "followingPhase",
    value: function followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|to|until|through|till|\\?)\\s*";
    }
  }, {
    key: "primaryPrefix",
    value: function primaryPrefix() {
      return "(?:(?:at|from)\\s*)??";
    }
  }, {
    key: "primarySuffix",
    value: function primarySuffix() {
      return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
    }
  }, {
    key: "extractPrimaryTimeComponents",
    value: function extractPrimaryTimeComponents(context, match) {
      var components = _superPropGet(ENTimeExpressionParser, "extractPrimaryTimeComponents", this, 3)([context, match]);
      if (!components) {
        return components;
      }
      if (match[0].endsWith("night")) {
        var hour = components.get("hour");
        if (hour >= 6 && hour < 12) {
          components.assign("hour", components.get("hour") + 12);
          components.assign("meridiem", _types.Meridiem.PM);
        } else if (hour < 6) {
          components.assign("meridiem", _types.Meridiem.AM);
        }
      }
      if (match[0].endsWith("afternoon")) {
        components.assign("meridiem", _types.Meridiem.PM);
        var _hour = components.get("hour");
        if (_hour >= 0 && _hour <= 6) {
          components.assign("hour", components.get("hour") + 12);
        }
      }
      if (match[0].endsWith("morning")) {
        components.assign("meridiem", _types.Meridiem.AM);
        var _hour2 = components.get("hour");
        if (_hour2 < 12) {
          components.assign("hour", components.get("hour"));
        }
      }
      return components.addTag("parser/ENTimeExpressionParser");
    }
  }, {
    key: "extractFollowingTimeComponents",
    value: function extractFollowingTimeComponents(context, match, result) {
      var followingComponents = _superPropGet(ENTimeExpressionParser, "extractFollowingTimeComponents", this, 3)([context, match, result]);
      if (followingComponents) {
        followingComponents.addTag("parser/ENTimeExpressionParser");
      }
      return followingComponents;
    }
  }]);
}(_AbstractTimeExpressionParser.AbstractTimeExpressionParser);