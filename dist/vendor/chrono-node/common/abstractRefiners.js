"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MergingRefiner = exports.Filter = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Filter = exports.Filter = /*#__PURE__*/function () {
  function Filter() {
    _classCallCheck(this, Filter);
  }
  return _createClass(Filter, [{
    key: "refine",
    value: function refine(context, results) {
      var _this = this;
      return results.filter(function (r) {
        return _this.isValid(context, r);
      });
    }
  }]);
}();
var MergingRefiner = exports.MergingRefiner = /*#__PURE__*/function () {
  function MergingRefiner() {
    _classCallCheck(this, MergingRefiner);
  }
  return _createClass(MergingRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var _this2 = this;
      if (results.length < 2) {
        return results;
      }
      var mergedResults = [];
      var curResult = results[0];
      var nextResult = null;
      var _loop = function _loop() {
        nextResult = results[i];
        var textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
        if (!_this2.shouldMergeResults(textBetween, curResult, nextResult, context)) {
          mergedResults.push(curResult);
          curResult = nextResult;
        } else {
          var left = curResult;
          var right = nextResult;
          var mergedResult = _this2.mergeResults(textBetween, left, right, context);
          context.debug(function () {
            console.log("".concat(_this2.constructor.name, " merged ").concat(left, " and ").concat(right, " into ").concat(mergedResult));
          });
          curResult = mergedResult;
        }
      };
      for (var i = 1; i < results.length; i++) {
        _loop();
      }
      if (curResult != null) {
        mergedResults.push(curResult);
      }
      return mergedResults;
    }
  }]);
}();