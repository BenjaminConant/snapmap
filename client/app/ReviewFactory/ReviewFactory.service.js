'use strict';

angular.module('snapmapApp')
  .factory('ReviewFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getReviews: function () {
        return meaningOfLife;
      }
    };
  });
