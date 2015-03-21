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
          return stores.data;
        }, function failed (err){
          console.log(err);
          return err;
        });
      },
      getStore: function (routeId) {
        return $http.get('/api/stores/'+routeId).then(function success(stores) {
          console.log(stores.data);
          return stores.data;
        }, function failed (err){
          console.log(err);
          return err;
        });
      }
    };
  });
