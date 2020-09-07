'use strict';
/**
 * This module provides access to Google Search Results via the SerpWow API
 * https://serpwow.com/
 */

const fetch = require('node-fetch'),
qs = require('querystring'),
host = 'https://api.serpwow.com';

let API_KEY; // To be set by clients

class SerpWow {
  constructor (apiKey) {
    if (!apiKey) throw new Error('No SerpWow API key specified');
    API_KEY = apiKey;
  }

  json (...args) {
    args.output = 'json';
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  html (...args) {
    args.output = 'html';
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY, 'html');
    return httpGet(url, options, cb, 'html');
  }

  csv (...args) {
    args.output = 'csv';
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/search', params, API_KEY, 'csv');
    return httpGet(url, options, cb, 'csv');
  }

  locations (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/locations', params, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  account (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/account', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  createBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches', {}, API_KEY);
    return httpPost(url, params, cb, 'json');
  }

  updateBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
    return httpPut(url, args[1], cb, 'json');
  }

  startBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/start', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  stopBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/stop', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  deleteBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
    return httpDelete(url, options, cb, 'json');
  }

  getBatch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0], {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  listBatches (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches', params, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  updateBatchSearch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/' + args[1], {}, API_KEY);
    return httpPut(url, args[2], cb, 'json');
  }

  deleteBatchSearch (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/' + args[1], {}, API_KEY);
    return httpDelete(url, options, cb, 'json');
  }

  listBatchSearches (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/' + args[1], {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  findBatchSearches (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/' + args[1], {}, API_KEY, null, { q: args[2] });
    return httpGet(url, options, cb, 'json');
  }

  listAllBatchSearchesAsJSON (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/json', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  listAllBatchSearchesAsCSV (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/searches/csv', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  listBatchResultSets (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  getBatchResultSet (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results/' + args[1], {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

  getBatchResultSetAsCSV (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/live/batches/' + args[0] + '/results/' + args[1] + '/csv', {}, API_KEY);
    return httpGet(url, options, cb, 'json');
  }

}

class SerpWowError extends Error {
  constructor(err) {
    super();
    var n = `SerpWowError: ${err.code} - ${err.status}`;
    this.name = n;
    this.code = err.code;
    this.status = err.status;
    this.message = err.message;
  }
}

function splitArgsIntoOptionsAndCallback (args) {
  let params;
  let options;
  let cb;
  if (args.length > 1) {
    const possibleCb = args[args.length - 1];
    if ('function' === typeof possibleCb) {
      cb = possibleCb;
      options = args.length === 3 ? args[1] : undefined;
    } else {
      options = args[1];
    }
    params = args[0];
  } else if ('object' === typeof args[0]) {
    params = args[0];
  } else if ('function' === typeof args[0]) {
    cb = args[0];
  }
  return { params, options, cb };
}

function createUrlFromEndpointAndOptions (endpoint, options, apiKey, output, qsArgs) {
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
    for (let argName of Object.keys(qsArgs)) {
      o[argName] = qsArgs[argName];
    }
  }
  const query = qs.stringify(o);
  const baseURL = `${host}${endpoint}`;
  var r = query ? `${baseURL}?${query}` : baseURL;
  return r;
}

function httpGet(url, options, cb, type) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { headers: {} };
  return fetch(url, reqOptions).then(res => Promise.all([res, res.text()])).then(([res, body]) => {

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
      }
      try {
        e.message = JSON.parse(body).request_info.message;
      } catch(inner) {}
      throw new SerpWowError(e)
    }
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

function httpPost(url, body, cb, type) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { 
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' } };
  return fetch(url, reqOptions).then(res => Promise.all([res, res.text()])).then(([res, body]) => {

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
      }
      try {
        e.message = JSON.parse(body).request_info.message;
      } catch(inner) {}
      throw new SerpWowError(e)
    }
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

function httpPut(url, body, cb, type) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { 
    method: 'put',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' } };
  return fetch(url, reqOptions).then(res => Promise.all([res, res.text()])).then(([res, body]) => {

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
      }
      try {
        e.message = JSON.parse(body).request_info.message;
      } catch(inner) {}
      throw new SerpWowError(e)
    }
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

function httpDelete(url, cb, type) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { 
    method: 'delete',
    headers: {} };
  return fetch(url, reqOptions).then(res => Promise.all([res, res.text()])).then(([res, body]) => {

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
      }
      try {
        e.message = JSON.parse(body).request_info.message;
      } catch(inner) {}
      throw new SerpWowError(e)
    }
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

module.exports = SerpWow;