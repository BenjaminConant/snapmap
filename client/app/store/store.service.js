'use strict';

angular.module('snapmapApp')
  .factory('store', function ($http, GeolocationFactory) {
    // Service logic
    // ...

    // Public API here


    var categoryObj = {
      'Food': '4d4b7105d754a06374d81259',
      'healthfood': '50aa9e744b90af0d42d5de0e', 
      'foodCourt': '4bf58dd8d48988d120951735', 
      'foodAllTypes': '4d4b7105d754a06374d81259', 
      'FastFood': '4bf58dd8d48988d16e941735', 
      'FoodTruck': '4bf58dd8d48988d1cb941735',
      'SoulFood': '4bf58dd8d48988d14f941735', 
      'Seafood': '4bf58dd8d48988d1ce941735', 
      'farmersMarket': '4bf58dd8d48988d1fa941735', 
      'GroceryStore': '4bf58dd8d48988d118951735', 
      'SuperMarket': '52f2ab2ebcbc57f1066b8b46', 
      'OrganicGrocery': '52f2ab2ebcbc57f1066b8b45', 
      'FishMarket': '4bf58dd8d48988d10e951735'
    }


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
      getAllPlaces: function (data){
        return $http.get('/api/placeDetails', {params: data}).then(function success(places) {
          console.log("RETURNED", places.data);
          return places.data;
        });
      }
    };
  });
