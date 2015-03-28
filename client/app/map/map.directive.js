'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, store, $state, $q) {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var loadMarkers = function () {
             console.log(scope.map.center);
             console.log(scope.map.zoom);

             
              if (scope.map.zoom >= 13) {
                if (scope.map.zoom >= 17) {
                  var dist = 1;
                } else if (scope.map.zoom === 16) {
                  var dist = 1.2
                } else if (scope.map.zoom === 15){
                  var dist = 1.5
                } else if (scope.map.zoom === 14){
                  var dist = 1.7
                } else if (scope.map.zoom === 13){
                  var dist = 1.7
                } else if (scope.map.zoom === 12){
                  var dist = 1.7
                } else if (scope.map.zoom === 11){
                  var dist = 1.7
                }
                data = {
                  coords: [scope.map.center.longitude, scope.map.center.latitude], 
                  dist: dist
                }
                store.someMethod(data)
                .then(function (location){
                  scope.locations = [];
                  scope.groceries = [];
                  console.log('stores ', location)
                  console.log('stores length ', location.length)
                  location.forEach(function(store){
                    scope.locations.push(store);
                    // if (regex.test(store.name.toLowerCase())) scope.groceries.push(store);
                    // else scope.locations.push(store);
                  })
                })
              } else {
                scope.locations = [];
                scope.groceries = [];
                console.log("scroll in to view stores")
              }

     
             };

        scope.mapChanged = {idle: loadMarkers, dragend: loadMarkers} 

            
      	var data; 
      	// var deferred = $q.defer()
      	GeolocationFactory.getGeo().then(function (){
      		console.log('coords: ', GeolocationFactory.latitude, GeolocationFactory.longitude)
	      if (GeolocationFactory.latitude && GeolocationFactory.longitude){
	      	uiGmapGoogleMapApi.then(function (maps){
						scope.map = { 
							center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude}, 
							zoom: 17
						};
						console.log('map: ', scope.map)
					})
	      }
	    })
      .then(function(){
      	data = {
      		coords: [GeolocationFactory.longitude, GeolocationFactory.latitude], 
      		dist: 1
      	}
      })
      .then(function(){
      	var regex = /grocery/;
      	scope.locations = [];
      	scope.groceries = [];
      	store.someMethod(data)
      	.then(function (location){
    			console.log('location: ', location)
    			location.forEach(function(store){
	    			if (regex.test(store.name.toLowerCase())) scope.groceries.push(store);
	    			else scope.locations.push(store);
    				
    			})
	    	});
      })
    }
	}

});