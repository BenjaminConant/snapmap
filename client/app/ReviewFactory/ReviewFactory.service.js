'use strict';

angular.module('snapmapApp')
  .factory('ReviewFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getReviews: function(storeId){
        return $http.get('/api/reviews/:'+storeId, function(response){ //need to create a route
          return response.data;
        });
      }

    };
  });
