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
  GOOGLE_ID:        '943133073328-ueq5jmdj0r2atspprs9bm0p6as3edbm9.apps.googleusercontent.com',
  GOOGLE_SECRET:    'u4dJLf_eI4Dg-a7NqXU5S5Ie',

  APP_DOMAIN: 'http://localhost:9000'


  // Control debug level for modules using visionmedia/debug
  // DEBUG: ''
};
