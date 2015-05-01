'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/snapmap-dev'
  },
  google: {
  	clientID: '1042313920036-j2oebrj2rc0uf7j9138jsf4f6nl05mf9.apps.googleusercontent.com',
  	clientSecret: 'KZm4QkyPCQTWHqX4lDiDPGq8',
  	callbackURL: 'http://127.0.0.1:9000/auth/google/oauth2callback'
  },
  facebook: {
    clientID: '417318375106507',
    clientSecret: '9fd46cd6727148d5cbd224ea9162f02a',
    callbackURL: 'http://127.0.0.1:9000/auth/facebook/callback'
  },
  seedDB: true,
  PORT: 9000 
};
