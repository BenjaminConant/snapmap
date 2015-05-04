'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, store, $q, uiGmapIsReady, $rootScope) {
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

        scope.transportModes = [{name: 'Driving' ,type:'DRIVING'}, {name: 'Walking' ,type:'WALKING'}, {name: 'Bicycling' ,type:'BICYCLING'}, {name: 'Transit' ,type:'TRANSIT'}];
        scope.selectedMode = 'TRANSIT';
        scope.directionsPressed = false;
        scope.locate = {};
        
        // this function builds the arrays that the markers go into
        var loadMarkers = function (maps) {     
          var j = [maps.getBounds().va.j, maps.getBounds().Ea.j]; 
          var k = [maps.getBounds().va.k, maps.getBounds().Ea.k];
          var data = {j: j, k: k};

          /*
            TYPES: restaurant, store, health, pharmacy, grocery_or_supermarket

            If 'health' is at any index in the place's types array, this for loop 
            will assign a green dot to the marker, push it into the locations array 
            and then continue on to the next index 
    
          */
       
          store.getAllPlaces(data)
            .then(function (places) {
              console.log("these are the places",places);
              scope.locations = [];
              for (var i = 0, len = places.length; i < len; i++){
                if (places[i].types.indexOf('health') > - 1){
                  places[i].marker = 'assets/images/green-dot.png'; 
                  scope.locations.push(places[i])
                  continue;
                }
                else if (places[i].types.indexOf('pharmacy') > -1){
                  places[i].marker = 'assets/images/purple-dot.png';
                  scope.locations.push(places[i])
                  continue;
                }
                else if (places[i].types.indexOf('restaurant') > -1){
                  places[i].marker = 'assets/images/blue-dot.png';
                  scope.locations.push(places[i])
                  continue;
                }
                else if (places[i].types.indexOf('grocery_or_supermarket') > -1){
                  places[i].marker = 'assets/images/yellow-dot.png';
                  scope.locations.push(places[i])
                  continue;
                }
                else if (places[i].types.indexOf('store') > -1){
                  places[i].marker = 'assets/images/red-dot.png';
                  scope.locations.push(places[i])
                }
              }
              /*
                DRYER:
              */

              // for (var i = 0, len = places.length; i < len; i++){
              //   scope.locations.push(places[i])
              //   if (places[i].types.indexOf('health') > - 1){
              //     places[i].marker = 'assets/images/green-dot.png'; 
              //     continue;
              //   }
              //   else if (places[i].types.indexOf('pharmacy') > -1){
              //     places[i].marker = 'assets/images/purple-dot.png';
              //     continue;
              //   }
              //   else if (places[i].types.indexOf('restaurant') > -1){
              //     places[i].marker = 'assets/images/blue-dot.png';
              //     continue;
              //   }
              //   else if (places[i].types.indexOf('grocery_or_supermarket') > -1){
              //     places[i].marker = 'assets/images/yellow-dot.png';
              //     scope.locations.push(places[i])
              //   }
              //   else if (places[i].types.indexOf('store') > -1){
              //     places[i].marker = 'assets/images/red-dot.png';
              //   }
              // }
            })
            .catch(function(err){
              console.log('err: ', err)
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

        scope.$root.route = function (location){
            scope.directionsPressed = true;
            if(location) scope.locate = location;
            if(GeolocationFactory.latitude && GeolocationFactory.longitude){
              uiGmapIsReady.promise(1).then(function (instance){
                var request = {
                  origin: new scope.maps.LatLng(
                    GeolocationFactory.latitude,
                    GeolocationFactory.longitude
                  ),
                  destination: new scope.maps.LatLng(
                    scope.locate.latitude, 
                    scope.locate.longitude
                  ),
                  travelMode: scope.maps.TravelMode[scope.selectedMode],
                  optimizeWaypoints: true
                };
                scope.directionsDisplay.setMap(instance[0].map);
                scope.directionsDisplay.setPanel(document.getElementById('direction-panel'));
                scope.directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    scope.directionsDisplay.setDirections(response);
                  }
                
                });
              });
            }
            else{
              console.log('You need to allow tracking to receive Direction information');
            }
        }

        scope.closeDirections = function (){
          scope.directionsPressed = false;
          scope.directionsDisplay.setMap(null);
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