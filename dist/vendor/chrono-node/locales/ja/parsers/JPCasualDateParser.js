"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _types = require("../../../types.js");
var references = _interopRequireWildcard(require("../../../common/casualReferences.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PATTERN = /今日|きょう|本日|ほんじつ|昨日|きのう|明日|あした|今夜|こんや|今夕|こんゆう|今晩|こんばん|今朝|けさ/i;
function normalizeTextToKanji(text) {
  switch (text) {
    case "きょう":
      return "今日";
    case "ほんじつ":
      return "本日";
    case "きのう":
      return "昨日";
    case "あした":
      return "明日";
    case "こんや":
      return "今夜";
    case "こんゆう":
      return "今夕";
    case "こんばん":
      return "今晩";
    case "けさ":
      return "今朝";
    default:
      return text;
  }
}
var JPCasualDateParser = exports["default"] = /*#__PURE__*/function () {
  function JPCasualDateParser() {
    _classCallCheck(this, JPCasualDateParser);
  }
  return _createClass(JPCasualDateParser, [{
    key: "pattern",
    value: function pattern() {
      return PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var text = normalizeTextToKanji(match[0]);
      var components = context.createParsingComponents();
      switch (text) {
        case "昨日":
          return references.yesterday(context.reference);
        case "明日":
          return references.tomorrow(context.reference);
        case "本日":
        case "今日":
          return references.today(context.reference);
      }
      if (text == "今夜" || text == "今夕" || text == "今晩") {
        components.imply("hour", 22);
        components.assign("meridiem", _types.Meridiem.PM);
      } else if (text.match("今朝")) {
        components.imply("hour", 6);
        components.assign("meridiem", _types.Meridiem.AM);
      }
      var date = context.refDate;
      components.assign("day", date.getDate());
      components.assign("month", date.getMonth() + 1);
      components.assign("year", date.getFullYear());
      return components;
    }
  }]);
}();