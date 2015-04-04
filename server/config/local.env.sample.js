'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'snapmap-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  //Google Config Vars
  GOOGLE_ID:        '1084116586389-n8cc595dgt6rjten1of45hkaf6e5r6q3.apps.googleusercontent.com',
  GOOGLE_SECRET:    'xetWYCthbtIDxIw2k7eQKAXj',

  APP_DOMAIN: 'http://localhost:9000'


  // Control debug level for modules using visionmedia/debug
  // DEBUG: ''
};
