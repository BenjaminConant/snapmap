'use strict';

angular.module('snapmapApp')
  .controller('BackendtestCtrl', function ($scope, store) {
    $scope.message = 'Hello';


    store.someMethod().then(function success(stores){
    	console.log('stores here: ', stores)
    });

	// store.foursquare().then(function success(dataArray){
	//     console.log('foursquare: ', dataArray)
		
	// });


    // for (var i = 0; i < foursquare.response.venues.length; i++){
    // 	console.log( i + foursquare.response.venues[i])
    // }

    // foursquare.response.venues.forEach(function(store){

    // })


  });
