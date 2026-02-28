"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var OverlapRemovalRefiner = exports["default"] = /*#__PURE__*/function () {
  function OverlapRemovalRefiner() {
    _classCallCheck(this, OverlapRemovalRefiner);
  }
  return _createClass(OverlapRemovalRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var _this = this;
      if (results.length < 2) {
        return results;
      }
      var filteredResults = [];
      var prevResult = results[0];
      var _loop = function _loop() {
        var result = results[i];
        if (result.index >= prevResult.index + prevResult.text.length) {
          filteredResults.push(prevResult);
          prevResult = result;
          return 1; // continue
        }
        var kept = null;
        var removed = null;
        if (result.text.length > prevResult.text.length) {
          kept = result;
          removed = prevResult;
        } else {
          kept = prevResult;
          removed = result;
        }
        context.debug(function () {
          console.log("".concat(_this.constructor.name, " remove ").concat(removed, " by ").concat(kept));
        });
        prevResult = kept;
      };
      for (var i = 1; i < results.length; i++) {
        if (_loop()) continue;
      }
      if (prevResult != null) {
        filteredResults.push(prevResult);
      }
      return filteredResults;
    }
  }]);
}();