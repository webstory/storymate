/* global requirejs */
'use strict';

const cloudflare = 'https://cdnjs.cloudflare.com/ajax/libs/';
const jsdelivr = 'https://cdn.jsdelivr.net/';
const osscdn = 'https://oss.maxcdn.com/';
const google = 'https://ajax.googleapis.com/ajax/libs/';

// -----------------------------------
// GLOBAL CONSTANTS
// -----------------------------------
const Constants = {
  accessTokens: {
  },
};

requirejs.config({
  paths: {
    'jquery': [
      google+'jquery/2.1.4/jquery.min',
      osscdn+'jquery/2.1.4/jquery.min',
      jsdelivr+'jquery/2.1.4/jquery.min',
      cloudflare+'jquery/2.1.4/jquery.min'
    ],
    'lodash': [
      cloudflare+'lodash.js/3.10.1/lodash.min',
      jsdelivr+'lodash.js/3.10.1/lodash.min',
      osscdn+'lodash/3.10.1/lodash.min'
    ],
    'socketio': [
      "https://cdn.socket.io/socket.io-1.3.2",
      jsdelivr+'socket.io-client/1.3.2/socket.io.min',
      osscdn+'socket.io-client/1.3.2/socket.io.min',
      cloudflare+'socket.io/1.3.2/socket.io.min'
    ],
    'cryptojs-core': [
      jsdelivr+'crypto-js/3.1.2/components/core-min',
      osscdn+'crypto-js/3.1.2/components/core-min',
      cloudflare+'crypto-js/3.1.2/components/core-min'
    ],
    'cryptojs-x64': [
      jsdelivr+'crypto-js/3.1.2/components/x64-core-min',
      osscdn+'crypto-js/3.1.2/components/x64-core-min',
      cloudflare+'crypto-js/3.1.2/components/x64-core-min'
    ],
    'cryptojs-base64': [
      jsdelivr+'crypto-js/3.1.2/components/enc-base64-min',
      osscdn+'crypto-js/3.1.2/components/enc-base64-min',
      cloudflare+'crypto-js/3.1.2/components/enc-base64-min'
    ],
    'cryptojs-sha512': [
      jsdelivr+'crypto-js/3.1.2/components/sha512-min',
      osscdn+'crypto-js/3.1.2/components/sha512-min',
      cloudflare+'crypto-js/3.1.2/components/sha512-min'
    ],
    'cryptojs-hmac': [
      jsdelivr+'crypto-js/3.1.2/components/hmac-min',
      osscdn+'crypto-js/3.1.2/components/hmac-min',
      cloudflare+'crypto-js/3.1.2/components/hmac-min'
    ],
    'cryptojs-md5': [
      jsdelivr+'crypto-js/3.1.2/components/md5-min',
      osscdn+'crypto-js/3.1.2/components/md5-min',
      cloudflare+'crypto-js/3.1.2/components/md5-min'
    ],
    'select2': [
      jsdelivr+'select2/4.0.0/js/select2.min',
      osscdn+'select2/4.0.0/js/select2.min',
      cloudflare+'select2/4.0.0/js/select2.min'
    ],
    'bootstrap': [
      cloudflare+'twitter-bootstrap/3.3.5/js/bootstrap.min',
      jsdelivr+'bootstrap/3.3.5/js/bootstrap.min',
      osscdn+'bootstrap/3.3.5/js/bootstrap.min'
    ],
    'bootstrap-switch': [
      cloudflare+'bootstrap-switch/3.3.2/js/bootstrap-switch.min',
      jsdelivr+'bootstrap.switch/3.3.2/js/bootstrap-switch.min',
      osscdn+'bootstrap.switch/3.3.2/js/bootstrap-switch.min'
    ],
    'notifyjs': [
      cloudflare+'notify/0.3.2/notify.min'
    ],
    'notify-bootstrap': [
      cloudflare+'notify/0.3.2/styles/bootstrap/notify-bootstrap.min'
    ],
    'highcharts': [
      'http://code.highcharts.com/highcharts'
    ],
  },

  shim: {
    'lodash': { exports:'_' },
    'socketio': { exports:'io' },

    'cryptojs-core': { exports:'CryptoJS' },
    'cryptojs-x64': { deps: ['cryptojs-core'] },
    'cryptojs-base64': { deps: ['cryptojs-x64'] },
    'cryptojs-sha512': { deps: ['cryptojs-x64'] },
    'cryptojs-hmac': { deps: ['cryptojs-x64'] },
    'cryptojs-md5': { deps: ['cryptojs-x64'] },

    'select2': { deps: ['jquery'] },
    'bootstrap': { deps: ['jquery'] },
    'notifyjs': { deps: ['jquery', 'bootstrap'] },
    'notify-bootstrap': { deps: ['notifyjs', 'jquery', 'bootstrap'] },
    'bootstrap-switch': { deps: ['jquery', 'bootstrap'] },

    'highcharts': { exports: 'Highcharts' },
  }

});

require(["jquery"], function($) {

  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });

  $(function() {
    var parser=document.createElement('a');
    parser.href = window.location.href;
    Constants.links.app_root = "/storymate/client/app";
  });
});
