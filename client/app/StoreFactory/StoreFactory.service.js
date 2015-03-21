'use strict';

angular.module('snapmapApp')
  .factory('StoreFactory', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getStore: function(routeId){
        return $http.get('/api/stores/:'+routeId, function(response){
          return response.data;
        })
      }

    };
  });
