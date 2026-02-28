"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParsingContext = exports.Chrono = void 0;
var _results = require("./results.js");
var _configuration = _interopRequireDefault(require("./locales/en/configuration.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Chrono = exports.Chrono = /*#__PURE__*/function () {
  function Chrono(configuration) {
    _classCallCheck(this, Chrono);
    _defineProperty(this, "parsers", void 0);
    _defineProperty(this, "refiners", void 0);
    _defineProperty(this, "defaultConfig", new _configuration["default"]());
    configuration = configuration || this.defaultConfig.createCasualConfiguration();
    this.parsers = _toConsumableArray(configuration.parsers);
    this.refiners = _toConsumableArray(configuration.refiners);
  }
  return _createClass(Chrono, [{
    key: "clone",
    value: function clone() {
      return new Chrono({
        parsers: _toConsumableArray(this.parsers),
        refiners: _toConsumableArray(this.refiners)
      });
    }
  }, {
    key: "parseDate",
    value: function parseDate(text, referenceDate, option) {
      var results = this.parse(text, referenceDate, option);
      return results.length > 0 ? results[0].start.date() : null;
    }
  }, {
    key: "parse",
    value: function parse(text, referenceDate, option) {
      var context = new ParsingContext(text, referenceDate, option);
      var results = [];
      this.parsers.forEach(function (parser) {
        var parsedResults = Chrono.executeParser(context, parser);
        results = results.concat(parsedResults);
      });
      results.sort(function (a, b) {
        return a.index - b.index;
      });
      this.refiners.forEach(function (refiner) {
        results = refiner.refine(context, results);
      });
      return results;
    }
  }], [{
    key: "executeParser",
    value: function executeParser(context, parser) {
      var results = [];
      var pattern = parser.pattern(context);
      var originalText = context.text;
      var remainingText = context.text;
      var match = pattern.exec(remainingText);
      var _loop = function _loop() {
        var index = match.index + originalText.length - remainingText.length;
        match.index = index;
        var result = parser.extract(context, match);
        if (!result) {
          remainingText = originalText.substring(match.index + 1);
          match = pattern.exec(remainingText);
          return 1; // continue
        }
        var parsedResult = null;
        if (result instanceof _results.ParsingResult) {
          parsedResult = result;
        } else if (result instanceof _results.ParsingComponents) {
          parsedResult = context.createParsingResult(match.index, match[0]);
          parsedResult.start = result;
        } else {
          parsedResult = context.createParsingResult(match.index, match[0], result);
        }
        var parsedIndex = parsedResult.index;
        var parsedText = parsedResult.text;
        context.debug(function () {
          return console.log("".concat(parser.constructor.name, " extracted (at index=").concat(parsedIndex, ") '").concat(parsedText, "'"));
        });
        results.push(parsedResult);
        remainingText = originalText.substring(parsedIndex + parsedText.length);
        match = pattern.exec(remainingText);
      };
      while (match) {
        if (_loop()) continue;
      }
      return results;
    }
  }]);
}();
var ParsingContext = exports.ParsingContext = /*#__PURE__*/function () {
  function ParsingContext(text, refDate, option) {
    _classCallCheck(this, ParsingContext);
    _defineProperty(this, "text", void 0);
    _defineProperty(this, "option", void 0);
    _defineProperty(this, "reference", void 0);
    _defineProperty(this, "refDate", void 0);
    this.text = text;
    this.option = option !== null && option !== void 0 ? option : {};
    this.reference = _results.ReferenceWithTimezone.fromInput(refDate, this.option.timezones);
    this.refDate = this.reference.instant;
  }
  return _createClass(ParsingContext, [{
    key: "createParsingComponents",
    value: function createParsingComponents(components) {
      if (components instanceof _results.ParsingComponents) {
        return components;
      }
      return new _results.ParsingComponents(this.reference, components);
    }
  }, {
    key: "createParsingResult",
    value: function createParsingResult(index, textOrEndIndex, startComponents, endComponents) {
      var text = typeof textOrEndIndex === "string" ? textOrEndIndex : this.text.substring(index, textOrEndIndex);
      var start = startComponents ? this.createParsingComponents(startComponents) : null;
      var end = endComponents ? this.createParsingComponents(endComponents) : null;
      return new _results.ParsingResult(this.reference, index, text, start, end);
    }
  }, {
    key: "debug",
    value: function debug(block) {
      if (this.option.debug) {
        if (this.option.debug instanceof Function) {
          this.option.debug(block);
        } else {
          var handler = this.option.debug;
          handler.debug(block);
        }
      }
    }
  }]);
}();