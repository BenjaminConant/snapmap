'use strict';

angular.module('snapmapApp')
  .controller('StoresCtrl', function ($scope, $stateParams, store) {
    $scope.message = 'Hello';
    console.log($stateParams);
    store.getStore($stateParams.storeId).then(function(store, err){
    	console.log('store', store, 'err', err);
    	if (err) console.log('err', err);
    	if(store){
    		console.log('store', store);
    		$scope.store=store; //maybe make explicit
    		$scope.store.review = 'Here is a very informed description about the location, this should be populated by a foursquare query and be awesome';
    	}
    })

    //get reviews from id (possibly the smae)


  });
