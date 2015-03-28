'use strict';

angular.module('snapmapApp')
  .controller('StoresCtrl', function ($scope, $stateParams, store, ReviewFactory) {

    ///////////////// This controller controls /store/:id page ///////////////

    var vm = this; 

    // this function loads the store info 
    console.log('stateParams: ', $stateParams.storeId)
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

    //get reviews from id (possibly the same)


    // this function uses the ReviewFactory to ping the reviews endpoint
    // that finds reviews based on store ids == Review.find({storeid: req.params.storeId})
    vm.getReviews = function(){
      ReviewFactory
        .getReviews($stateParams.storeId)
        .then(function fulfilled(allReviews){
          console.log('allReviews: ', allReviews)
          allReviews.forEach(function(review){
            review.staricons = []; 
            for (var i = 0; i < review.rating; i++){
              review.staricons.push(i)
            }
          })
          $scope.reviews = allReviews; 
        })
      }


      vm.getReviews()


  });
