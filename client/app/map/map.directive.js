'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, store, $state, $q, uiGmapIsReady, $rootScope) {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        
        
        //init the map
      	GeolocationFactory.getGeo().then(function (){
  	      if (GeolocationFactory.latitude && GeolocationFactory.longitude){
  	      	uiGmapGoogleMapApi.then(function (maps){
              scope.maps = maps;
              scope.map = { 
  							center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude}, 
  							zoom: 17,
                windowTemplate: "popup.html",
                windowParameter: {
                  options: {
                    minHeight: '150px',
                    minWidth: '180px'
                  },
                  parent: scope
                }
  						};
              scope.directionsService = new maps.DirectionsService();
              scope.directionsDisplay = new maps.DirectionsRenderer();
  					})
  	      }
  	    });

        // this function builds the arrays that the markers go into
        var loadMarkers = function (maps) {     
          var j = [maps.getBounds().va.j, maps.getBounds().Ea.j]; 
          var k = [maps.getBounds().va.k, maps.getBounds().Ea.k];
          var data = {j: j, k: k};
          store.getStores(data)
            .then(function (location){
              // we can have diffrent arrays for each type of marker, groceries will cause green markers
              // we should do the regexing on the backend though so I am taking it out in the front end
              scope.locations = []; 
              // scope.groceries = [];
              location.forEach(function(store){
                scope.locations.push(store);
              })
            })
         };

        scope.markerClick = function(marker) {
            if(marker.show) {
                marker.show = false;
            } else {
                _.forEach(scope.locations, function(curMarker) {
                    curMarker.show = false;
                });
                marker.show = true;
            }
        };

        scope.click = function (){
          console.log('into directive');
        }

        scope.markerClose = function(marker) {
            marker.show = false;
        }; 

        scope.$root.route = function (location){
            if(GeolocationFactory.latitude && GeolocationFactory.longitude){
              uiGmapIsReady.promise(1).then(function (instance){
                var request = {
                  origin: new scope.maps.LatLng(
                    GeolocationFactory.latitude,
                    GeolocationFactory.longitude
                  ),
                  destination: new scope.maps.LatLng(
                    location.latitude, 
                    location.longitude
                  ),
                  travelMode: scope.maps.TravelMode['WALKING'],
                  optimizeWaypoints: true
                };
                console.log(request);
                scope.directionsDisplay.setMap(instance[0].map);
                scope.directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    console.log('finished directions with ', response, status);
                    console.log('you will go ', response.routes[0].legs[0].distance.text, 'in', response.routes[0].legs[0].duration.text);
                      scope.directionsDisplay.setDirections(response);
                  }
                
                });
              });
            }
            else{
              alert('You need to allow tracking to receive Direction information');
            }
        }

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