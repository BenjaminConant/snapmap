'use strict';

angular.module('snapmapApp')
  .factory('store', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return $http.get('/api/stores').then(function success(stores) {
          console.log(stores.data);
        }, function failed (err){
          console.log(err);
        });
      }
    };
  });
