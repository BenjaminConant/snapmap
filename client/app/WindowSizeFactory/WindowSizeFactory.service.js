'use strict';

angular.module('snapmapApp')
  .factory('WindowSizeFactory', function ($window) {
      var factory = {};
        factory.getWindowSize = function(){
          return $window.innerHeight;
        };
      return factory;
  });
