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

function createUrlFromEndpointAndOptions (endpoint, options, apiKey, output) {
  var o = {};
  if (options != null) {
    o = JSON.parse(JSON.stringify(options));
  }
  o.api_key = apiKey;
  o.source = 'nodejs';
  if (output != null) {
    o.output = output;
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

module.exports = SerpWow;


