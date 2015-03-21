'use strict';

angular.module('snapmapApp')
  .directive('map', function (uiGmapGoogleMapApi, GeolocationFactory, WindowSizeFactory, store, $state) {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	GeolocationFactory.getGeo().then(function (){
	      if (GeolocationFactory.latitude && GeolocationFactory.longitude){
	      	uiGmapGoogleMapApi.then(function (maps){
				scope.map = { 
					center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude }, 
					zoom: 17
				};
			});
	      }
	    });
	    store.someMethod().then(function (data){
	    	scope.locations = data;
	    });
      }
    };
  });