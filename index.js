/*!
 * bcoin-native
 * Copyright (c) 2016, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin-native
 */

'use strict';

var bcn = require('bindings')('bcoin-native');
var DUMMY = Buffer.alloc(0);
var crypto;

/*
 * Load crypto.
 */

bcn.hash = function hash(alg, data) {
  if (!crypto)
    crypto = require('crypto');
  return bcn._hash(alg, data);
};

bcn.hmac = function hmac(alg, data, key) {
  if (!crypto)
    crypto = require('crypto');
  return bcn._hmac(alg, data, key);
};

/*
 * Promisify some functions.
 */

bcn.scryptAsync = function scryptAsync(passwd, salt, N, r, p, len) {
  return new Promise(function(resolve, reject) {
    bcn._scryptAsync(passwd, salt, N, r, p, len, wrap(resolve, reject));
  });
};

/*
 * Wrap
 */

bcn.fromBech32 = function fromBech32(str) {
  var result = new AddrResult();
  return bcn._fromBech32(str, result);
};

bcn.siphash = function siphash(data, key) {
  var result = new U64();
  return bcn._siphash(data, key, result);
};

bcn.siphash256 = function siphash256(data, key) {
  var result = new U64();
  return bcn._siphash256(data, key, result);
};

/*
 * Constructor
 */

function AddrResult() {
  this.hrp = '';
  this.version = 0;
  this.hash = DUMMY;
}

function U64() {
  this.hi = 0;
  this.lo = 0;
}

/*
 * Helpers
 */

function wrap(resolve, reject) {
  return function(err, result) {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  };
}

/*
 * Expose
 */

module.exports = bcn;
