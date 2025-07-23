"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // components/BottomSheet.js
var _Dimensions$get = _reactNative.Dimensions.get('window'),
  screenHeight = _Dimensions$get.height;
var DEFAULT_HEIGHT = 400;
var BottomSheet = function BottomSheet(_ref) {
  var visible = _ref.visible,
    onClose = _ref.onClose,
    children = _ref.children,
    height = _ref.height,
    styles = _ref.styles;
  var translateY = (0, _react.useRef)(new _reactNative.Animated.Value(height)).current;
  var _useState = (0, _react.useState)(visible),
    _useState2 = _slicedToArray(_useState, 2),
    isMounted = _useState2[0],
    setIsMounted = _useState2[1];
  (0, _react.useEffect)(function () {
    if (visible) {
      setIsMounted(true);
      _reactNative.Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      _reactNative.Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true
      }).start(function () {
        setIsMounted(false); // unmount after closing animation finishes
        if (onClose) onClose();
      });
    }
  }, [visible]);
  var panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
      return true;
    },
    onPanResponderMove: function onPanResponderMove(_, gestureState) {
      if (gestureState.dy > 0 && gestureState.dy <= height) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: function onPanResponderRelease(_, gestureState) {
      if (gestureState.dy > height / 3) {
        _reactNative.Animated.timing(translateY, {
          toValue: height,
          duration: 200,
          useNativeDriver: true
        }).start(function () {
          setIsMounted(false);
          if (onClose) onClose();
        });
      } else {
        _reactNative.Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    }
  })).current;
  if (!isMounted) return null;
  return /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, _extends({}, panResponder.panHandlers, {
    style: [styles === null || styles === void 0 ? void 0 : styles.bottomSheet, {
      transform: [{
        translateY: translateY
      }],
      height: height
    }]
  }), /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.handle
  }), children);
};
var _default = exports["default"] = BottomSheet;