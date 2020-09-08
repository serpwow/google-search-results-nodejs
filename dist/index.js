'use strict';
/**
 * This module provides access to Google Search Results via the SerpWow API
 * https://serpwow.com/
 */

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.keys");

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
  }, {
    key: "createBatch",
    value: function createBatch() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      var _splitArgsIntoOptions6 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions6.params,
          options = _splitArgsIntoOptions6.options,
          cb = _splitArgsIntoOptions6.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches', {}, API_KEY);
      return httpPost(url, params, cb, 'json');
    }
  }, {
    key: "updateBatch",
    value: function updateBatch() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      var _splitArgsIntoOptions7 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions7.params,
          options = _splitArgsIntoOptions7.options,
          cb = _splitArgsIntoOptions7.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
      return httpPut(url, args[1], cb, 'json');
    }
  }, {
    key: "startBatch",
    value: function startBatch() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      var _splitArgsIntoOptions8 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions8.params,
          options = _splitArgsIntoOptions8.options,
          cb = _splitArgsIntoOptions8.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/start', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "stopBatch",
    value: function stopBatch() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      var _splitArgsIntoOptions9 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions9.params,
          options = _splitArgsIntoOptions9.options,
          cb = _splitArgsIntoOptions9.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/stop', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "deleteBatch",
    value: function deleteBatch() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      var _splitArgsIntoOptions10 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions10.params,
          options = _splitArgsIntoOptions10.options,
          cb = _splitArgsIntoOptions10.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
      return httpDelete(url, options, cb, 'json');
    }
  }, {
    key: "getBatch",
    value: function getBatch() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      var _splitArgsIntoOptions11 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions11.params,
          options = _splitArgsIntoOptions11.options,
          cb = _splitArgsIntoOptions11.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "listBatches",
    value: function listBatches() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      var _splitArgsIntoOptions12 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions12.params,
          options = _splitArgsIntoOptions12.options,
          cb = _splitArgsIntoOptions12.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches', params, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "updateBatchSearch",
    value: function updateBatchSearch() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      var _splitArgsIntoOptions13 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions13.params,
          options = _splitArgsIntoOptions13.options,
          cb = _splitArgsIntoOptions13.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/' + args[1], {}, API_KEY);
      return httpPut(url, args[2], cb, 'json');
    }
  }, {
    key: "deleteBatchSearch",
    value: function deleteBatchSearch() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      var _splitArgsIntoOptions14 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions14.params,
          options = _splitArgsIntoOptions14.options,
          cb = _splitArgsIntoOptions14.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/' + args[1], {}, API_KEY);
      return httpDelete(url, options, cb, 'json');
    }
  }, {
    key: "listBatchSearches",
    value: function listBatchSearches() {
      for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      var _splitArgsIntoOptions15 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions15.params,
          options = _splitArgsIntoOptions15.options,
          cb = _splitArgsIntoOptions15.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/' + args[1], {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "findBatchSearches",
    value: function findBatchSearches() {
      for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      var _splitArgsIntoOptions16 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions16.params,
          options = _splitArgsIntoOptions16.options,
          cb = _splitArgsIntoOptions16.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/' + args[1], {}, API_KEY, null, {
        q: args[2]
      });
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "listAllBatchSearchesAsJSON",
    value: function listAllBatchSearchesAsJSON() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      var _splitArgsIntoOptions17 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions17.params,
          options = _splitArgsIntoOptions17.options,
          cb = _splitArgsIntoOptions17.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/json', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "listAllBatchSearchesAsCSV",
    value: function listAllBatchSearchesAsCSV() {
      for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        args[_key18] = arguments[_key18];
      }

      var _splitArgsIntoOptions18 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions18.params,
          options = _splitArgsIntoOptions18.options,
          cb = _splitArgsIntoOptions18.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/csv', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "listBatchResultSets",
    value: function listBatchResultSets() {
      for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }

      var _splitArgsIntoOptions19 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions19.params,
          options = _splitArgsIntoOptions19.options,
          cb = _splitArgsIntoOptions19.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results', {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "getBatchResultSet",
    value: function getBatchResultSet() {
      for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
        args[_key20] = arguments[_key20];
      }

      var _splitArgsIntoOptions20 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions20.params,
          options = _splitArgsIntoOptions20.options,
          cb = _splitArgsIntoOptions20.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results/' + args[1], {}, API_KEY);
      return httpGet(url, options, cb, 'json');
    }
  }, {
    key: "getBatchResultSetAsCSV",
    value: function getBatchResultSetAsCSV() {
      for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        args[_key21] = arguments[_key21];
      }

      var _splitArgsIntoOptions21 = splitArgsIntoOptionsAndCallback(args),
          params = _splitArgsIntoOptions21.params,
          options = _splitArgsIntoOptions21.options,
          cb = _splitArgsIntoOptions21.cb;

      var url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results/' + args[1] + '/csv', {}, API_KEY);
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

function createUrlFromEndpointAndOptions(endpoint, options, apiKey, output, qsArgs) {
  var o = {};

  if (options != null) {
    o = JSON.parse(JSON.stringify(options));
  }

  o.api_key = apiKey;
  o.source = 'nodejs';

  if (output != null) {
    o.output = output;
  }

  if (qsArgs != null) {
    var _arr = Object.keys(qsArgs);

    for (var _i = 0; _i < _arr.length; _i++) {
      var argName = _arr[_i];
      o[argName] = qsArgs[argName];
    }
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

function httpPost(url, body, cb, type) {
  var useCallback = 'function' === typeof cb;
  var reqOptions = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, reqOptions).then(function (res) {
    return Promise.all([res, res.text()]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        res = _ref4[0],
        body = _ref4[1];

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

function httpPut(url, body, cb, type) {
  var useCallback = 'function' === typeof cb;
  var reqOptions = {
    method: 'put',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, reqOptions).then(function (res) {
    return Promise.all([res, res.text()]);
  }).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        res = _ref6[0],
        body = _ref6[1];

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

function httpDelete(url, cb, type) {
  var useCallback = 'function' === typeof cb;
  var reqOptions = {
    method: 'delete',
    headers: {}
  };
  return fetch(url, reqOptions).then(function (res) {
    return Promise.all([res, res.text()]);
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        res = _ref8[0],
        body = _ref8[1];

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