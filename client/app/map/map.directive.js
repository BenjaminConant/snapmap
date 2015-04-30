'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, store, $state, $q) {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        
        //init the map
      	GeolocationFactory.getGeo().then(function (){
  	      if (GeolocationFactory.latitude && GeolocationFactory.longitude){
  	      	uiGmapGoogleMapApi.then(function (maps){
              scope.map = { 
  							center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude}, 
  							zoom: 17
  						};
  					})
  	      }
  	    })

        // this function builds the arrays that the markers go into
        var loadMarkers = function (maps) {     
          var j = [maps.getBounds().va.j, maps.getBounds().Ea.j]; 
          var k = [maps.getBounds().va.k, maps.getBounds().Ea.k];
          var data = {j: j, k: k};
          // store.getStores(data)
          //   .then(function (location){
          //     // we can have diffrent arrays for each type of marker, groceries will cause green markers
          //     // we should do the regexing on the backend though so I am taking it out in the front end
          //     scope.locations = []; 
          //     // scope.groceries = [];
          //     location.forEach(function(store){
          //       scope.locations.push(store);
          //     })
          //   })
         store.getAllPlaces(data)
            .then(function (places) {
              scope.locations = [];
              places.forEach(function (place) {
                scope.locations.push(place);
              });
            });
         };


        // this object is passed to the angular-google-maps directive
        // the keys are events from the google maps api and the values are functions that should      
        scope.mapChanged = {
                idle: loadMarkers,
                dragend: loadMarkers,
                tilesloaded: loadMarkers
              }; 


    }
	}

});