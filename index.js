"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(props) {
  var image = props.image,
      preloader = props.preloader,
      onActionStart = props.onActionStart,
      onActionEnd = props.onActionEnd,
      imageProps = props.imageProps;

  var _useState = (0, _react.useState)(preloader ? false : true),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1]; // console.log('loaded', loaded)
  // console.log('preloader', preloader)


  var transitions = (0, _reactSpring.useTransition)(loaded, null, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return {
      xys: [0, 0, 1],
      config: {
        mass: 1,
        tension: 500,
        friction: 24
      }
    };
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      xys = _useSpring2[0].xys,
      setStyle = _useSpring2[1];

  var pos = (0, _react.useRef)();
  var scale = (0, _react.useRef)();
  var imageDim = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (preloader) setLoaded(false);
    var img = new Image();

    img.onload = function () {
      imageDim.current = [img.width, img.height];
      if (preloader) setLoaded(true);
      managePostAction();
    };

    pos.current = [0, 0];
    scale.current = 1;
    img.src = image;
  }, [image]);

  var managePostAction = function managePostAction() {
    if (!containerRef.current) return;
    if (scale.current < 1) scale.current = 1;
    var containerRect = containerRef.current.getBoundingClientRect();
    var imgScale = containerRect.height / containerRect.width > imageDim.current[1] / imageDim.current[0] ? containerRect.width / imageDim.current[0] : containerRect.height / imageDim.current[1];
    var imageScaled = [imageDim.current[0] * imgScale * scale.current, imageDim.current[1] * imgScale * scale.current];
    var posLimit = [imageScaled[0] > containerRect.width ? Math.floor((imageScaled[0] - containerRect.width) / 2 / scale.current) : 0, imageScaled[1] > containerRect.height ? Math.floor((imageScaled[1] - containerRect.height) / 2 / scale.current) : 0];
    pos.current = [Math.abs(pos.current[0]) > posLimit[0] ? posLimit[0] * (pos.current[0] / Math.abs(pos.current[0])) : pos.current[0], Math.abs(pos.current[1]) > posLimit[1] ? posLimit[1] * (pos.current[1] / Math.abs(pos.current[1])) : pos.current[1]]; // set Style

    setStyle({
      xys: [].concat(_toConsumableArray(pos.current), [scale.current])
    });
  };

  var handleDragStart = (0, _react.useCallback)(function (e) {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    if (onActionStart) onActionStart({
      type: 'drag',
      touch: false
    });
    return false;
  }, []);
  var handleDrag = (0, _react.useCallback)(function (e) {
    pos.current = [pos.current[0] + e.movementX / scale.current, pos.current[1] + e.movementY / scale.current];
    setStyle({
      xys: [].concat(_toConsumableArray(pos.current), [scale.current])
    });
    return false;
  }, []);
  var handleDragEnd = (0, _react.useCallback)(function (e) {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    managePostAction();
    if (onActionEnd) onActionEnd({
      type: 'drag',
      touch: false
    });
    return false;
  }, []);
  var wheelTimeout = (0, _react.useRef)();
  var handleWheel = (0, _react.useCallback)(function (e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var delta = e.deltaY || e.deltaX;
    if (!delta) return;
    scale.current = Math.min(Math.max(scale.current + delta / Math.abs(delta) * 0.1, 1), 10);
    managePostAction();

    if (!wheelTimeout.current) {
      if (onActionStart) onActionStart({
        type: 'zoom',
        touch: false
      });
      wheelTimeout.current = setTimeout(function () {
        if (onActionEnd) onActionEnd({
          type: 'zoom',
          touch: false
        });
      }, 300);
    } else {
      clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(function () {
        if (onActionEnd) onActionEnd({
          type: 'zoom',
          touch: false
        });
      }, 300);
    }

    return false;
  }, []);
  var lastPos = (0, _react.useRef)();
  var lastRadius = (0, _react.useRef)();
  var handleTouchStart = (0, _react.useCallback)(function (e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    lastPos.current = [e.touches[0].screenX, e.touches[0].screenY];
    if (e.touches.length > 1) lastRadius.current = {
      touch: Math.sqrt(Math.pow(e.touches[0].screenX - e.touches[1].screenX, 2) + Math.pow(e.touches[0].screenY - e.touches[1].screenY, 2)),
      scale: scale.current
    };
    document.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });
    document.addEventListener('touchend', handleTouchEnd, {
      passive: false
    });
    if (onActionStart && e.touches.length > 1) onActionStart({
      type: 'zoom',
      touch: true
    });
    if (onActionStart && e.touches.length === 1) onActionStart({
      type: 'drag',
      touch: true
    });
    return false;
  }, []);
  var handleTouchMove = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length > 1) {
      var radius = Math.sqrt(Math.pow(e.touches[0].screenX - e.touches[1].screenX, 2) + Math.pow(e.touches[0].screenY - e.touches[1].screenY, 2));
      var deltaRad = lastRadius.current.scale * (radius / lastRadius.current.touch);
      scale.current = Math.min(Math.max(deltaRad, 0.8), 10);
      setStyle({
        xys: [].concat(_toConsumableArray(pos.current), [scale.current])
      });
    } else {
      pos.current = [pos.current[0] + (e.touches[0].screenX - lastPos.current[0]) / scale.current, pos.current[1] + (e.touches[0].screenY - lastPos.current[1]) / scale.current];
      lastPos.current = [e.touches[0].screenX, e.touches[0].screenY];
      setStyle({
        xys: [].concat(_toConsumableArray(pos.current), [scale.current])
      });
    }

    return false;
  }, []);
  var handleTouchEnd = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    managePostAction();
    if (onActionEnd && e.touches.length > 1) onActionEnd({
      type: 'zoom',
      touch: true
    });
    if (onActionEnd && e.touches.length === 1) onActionEnd({
      type: 'drag',
      touch: true
    });
    return false;
  }, []);
  return _react["default"].createElement("div", {
    ref: containerRef,
    onWheel: handleWheel,
    onMouseDown: handleDragStart,
    onTouchStart: handleTouchStart,
    style: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      userSelect: 'none'
    }
  }, preloader && !loaded ? preloader : transitions.map(function (_ref) {
    var item = _ref.item,
        key = _ref.key,
        props = _ref.props;
    return item && _react["default"].createElement(_reactSpring.animated.img, _extends({}, imageProps || {}, {
      key: key,
      style: _objectSpread({
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        objectPosition: 'center center',
        userSelect: 'none'
      }, props, {
        transform: xys.interpolate(function (x, y, s) {
          return "scale3d(".concat(s, ",").concat(s, ",1) translate3d(").concat(x, "px, ").concat(y, "px, 0px)");
        })
      }),
      draggable: "false",
      src: image
    }));
  }));
};

exports["default"] = _default;
