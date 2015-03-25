'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, store, $state, $q) {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
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
      		dist: 10
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