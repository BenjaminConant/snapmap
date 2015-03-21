'use strict';

angular.module('snapmapApp')
  .controller('StoresCtrl', function ($scope, $stateParams, StoreFactory) {
    $scope.message = 'Hello';

    StoreFactory.getStore($stateParams.name).then(function(store, err){
    	if (err) console.log(err);
    	if(store){
    		$scope.store=store;
    	}
    })

    //get reviews from id (possibly the smae)


  });
