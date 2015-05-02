'use strict';

angular.module('snapmapApp')
  .factory('store', function ($http, GeolocationFactory) {
    // Service logic
    // ...

    // Public API here


    return {

      getStores: function (data) {
        return $http.get('/api/stores', {params: data})
          .then(function success(stores) {
            // console.log("from the factory", stores.data);
            // console.log("from the factory", stores.data.length)
            return stores.data;
          }, function failed (err){
              return err;
          })
      },
      getStore: function (routeId) {
        return $http.get('/api/stores/'+routeId)
        .then(function success(stores) {
          return stores.data;
        }, function failed (err){
          return err;
        })
      }, 
      foursquare: function(categoriesArray) {
        return $http.get('/api/foursquares', {params: categoriesArray}).then(function success(stores) {
          console.log('foursquare service: ', JSON.parse(stores.data));
          return JSON.parse(stores.data)
        }, function failed (err){
          console.log(err);
        }).then(function success(data){
          return data.response.venues; 
        });
      },
      //Place details ajax request
      getAllPlaces: function (data){
        return $http.get('/api/placeDetails', {params: data}).then(function success(places) {
          return places.data;
        }, function failed (err){
            return err;
        });
      },
      //Get single place
      getPlace: function (storeId) {
        return $http.get('/api/placeDetails/' + storeId).then(function success (place) {
          console.log("this is the place", place);
          return place.data;
        }, function failed (err) {
            return err;
        });
      }
    };
  });
