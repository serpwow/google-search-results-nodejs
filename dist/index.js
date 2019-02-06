'use strict';
/**
 * This module provides access to Google Search Results via the SerpWow API
 * https://serpwow.com/
 */

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch = require('node-fetch'),
    qs = require('querystring'),
    host = 'https://api.serpwow.com';

var API_KEY; // To be set by clients

var SerpWow =
/*#__PURE__*/
function () {
  function SerpWow(apiKey) {
    _classCallCheck(this, SerpWow);

    if (!apiKey) throw new Error('No SerpWow API key specified');
    API_KEY = apiKey;
  }

  _createClass(SerpWow, [{
    key: "json",
    value: function json() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.output = 'json';

      var _splitArgsIntoOptions = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions.params,
          options = _splitArgsIntoOptions.options,
          cb = _splitArgsIntoOptions.cb;

      var url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "html",
    value: function html() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.output = 'html';

      var _splitArgsIntoOptions2 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions2.params,
          options = _splitArgsIntoOptions2.options,
          cb = _splitArgsIntoOptions2.cb;

      var url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY, 'html');
      return httpGet(url, options, cb, 'html');
    }
  }, {
    key: "csv",
    value: function csv() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      args.output = 'csv';

      var _splitArgsIntoOptions3 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions3.params,
          options = _splitArgsIntoOptions3.options,
          cb = _splitArgsIntoOptions3.cb;

      var url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY, 'csv');
      return httpGet(url, options, cb, 'csv');
    }
  }, {
    key: "locations",
    value: function locations() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var _splitArgsIntoOptions4 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions4.params,
          options = _splitArgsIntoOptions4.options,
          cb = _splitArgsIntoOptions4.cb;

      var url = createUrlFromEndpointAndOptions('/live/locations', params, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "account",
    value: function account() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      var _splitArgsIntoOptions5 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions5.params,
          options = _splitArgsIntoOptions5.options,
          cb = _splitArgsIntoOptions5.cb;

      var url = createUrlFromEndpointAndOptions('/live/account', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }]);

  return SerpWow;
}();

var SerpWowError =
/*#__PURE__*/
function (_Error) {
  _inherits(SerpWowError, _Error);

  function SerpWowError(err) {
    var _this;

    _classCallCheck(this, SerpWowError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SerpWowError).call(this));
    var n = "SerpWowError: ".concat(err.code, " - ").concat(err.status);
    _this.name = n;
    _this.code = err.code;
    _this.status = err.status;
    _this.message = err.message;
    return _this;
  }

  return SerpWowError;
}(_wrapNativeSuper(Error));

function splitArgsIntoOptionsAndCallback(args) {
  var params;
  var options;
  var cb;

  if (args.length > 1) {
    var possibleCb = args[args.length - 1];

    if ('function' === typeof possibleCb) {
      cb = possibleCb;
      options = args.length === 3 ? args[1] : undefined;
    } else {
      options = args[1];
    }

    params = args[0];
  } else if ('object' === _typeof(args[0])) {
    params = args[0];
  } else if ('function' === typeof args[0]) {
    cb = args[0];
  }

  return {
    params: params,
    options: options,
    cb: cb
  };
}

function createUrlFromEndpointAndOptions(endpoint, options, apiKey, output) {
  var o = {};

  if (options != null) {
    o = JSON.parse(JSON.stringify(options));
  }

  o.api_key = apiKey;
  o.source = 'nodejs';

  if (output != null) {
    o.output = output;
  }

  var query = qs.stringify(o);
  var baseURL = "".concat(host).concat(endpoint);
  var r = query ? "".concat(baseURL, "?").concat(query) : baseURL;
  return r;
}

function httpGet(url, options, cb, type) {
  var useCallback = 'function' === typeof cb;
  var reqOptions = {
    headers: {}
  };
  return fetch(url, reqOptions).then(function (res) {
    return Promise.all([res, res.text()]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        res = _ref2[0],
        body = _ref2[1];

    if (res.ok) {
      if (type === 'json') {
        body = JSON.parse(body);
      }

      if (useCallback) return cb(null, body);
      return body;
    } else {
      var e = {
        code: res.status,
        status: res.statusText
      };

      try {
        e.message = JSON.parse(body).request_info.message;
      } catch (inner) {}

      throw new SerpWowError(e);
    }
  }).catch(function (err) {
    if (useCallback) return cb(err);
    throw err;
  });
}

module.exports = SerpWow;