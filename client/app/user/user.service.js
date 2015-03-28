'use strict';

angular.module('snapmapApp')
  .factory('UserFactory', function ($http, Auth) {
    // Service logic
    // ...

    // Public API here

    var stores = []; 

    return {
      getStores: function(){
        return $http.get('/api/users/stores').then(function fulfilled(reviews){
          // console.log('reviews user: ', reviews.data)
          stores = reviews.data.map(function(review){
            return review.store; 
          })
          // console.log('stores: ', stores)
          return stores; 
        })
      }, 

      getReviews: function(){
        return $http.get('/api/users/reviews').then(function fulfilled(reviews){
          // console.log('reviews user: ', reviews.data)
          return reviews.data; 
        }, function failed(err){
          console.log('err: '), err
        })
      }

    };


});
