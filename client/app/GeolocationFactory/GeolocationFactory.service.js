'use strict';

angular.module('snapmapApp')
  .factory('GeolocationFactory', function ($q) {
      var factory = {};

      factory.getGeo = function (){
        return $q(function (resolve, reject){
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function (position){
              factory.latitude = position.coords.latitude;
              factory.longitude = position.coords.longitude;
              resolve();
            });
          } 
          else {
            console.log("Geolocation is not supported by this browser");
            reject();
          }
        });
      };

      return factory;
  });
