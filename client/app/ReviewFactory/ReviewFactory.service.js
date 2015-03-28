'use strict';

angular.module('snapmapApp')
  .factory('ReviewFactory', function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      // retrieves reviews by storeId
      getReviews: function(storeId){
        console.log('storeId', storeId)
        return $http.get('/api/reviews/'+storeId).then(function success(response){ //need to create a route
          console.log('response: ', response)
          return response.data;
        }, function failed(err){
          console.log('err: ', err)
        });
      }, 

      /// creates a review 
      submitReview: function (obj){
       return $http.post('/api/reviews/', obj).then(function (res){
          return res.data;
        });
       }

    };
  });
