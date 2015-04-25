'use strict';

angular.module('snapmapApp')
  .controller('StoresCtrl', function ($scope, $stateParams, store, ReviewFactory, Auth) {

    ///////////////// This controller controls /store/:id page ///////////////

    var vm = this; 

    // this function loads the store info 

    vm.getStore = function(){
      store.getStore($stateParams.storeId).then(function(store, err){
      	if(store){
          // cope for virtual persistence 
          var store = store; 
      		$scope.store= store; //maybe make explicit
          var ratingHolder = $scope.store.averageRating;
          $scope.store.averageRating = [];
          for (var i = 0; i < ratingHolder; i++) {
            $scope.store.averageRating.push(i);
          }
          console.log($scope.store);
      	}
      })
    }

    //get reviews from id (possibly the same)


    // this function uses the ReviewFactory to ping the reviews endpoint
    // that finds reviews based on store ids == Review.find({storeid: req.params.storeId})
    vm.getReviews = function(){
      ReviewFactory
        .getReviews($stateParams.storeId)
        .then(function fulfilled(allReviews){
          allReviews.forEach(function(review){
            review.staricons = []; 
            for (var i = 0; i < review.stars; i++){
              review.staricons.push(i)
            }
            if (!review.user.avatar) {
              review.user.avatar = 'http://lorempixel.com/100/100/abstract/';
            }
          })
          $scope.reviews = allReviews; 
        })
      }

      vm.getStore()
      vm.getReviews()


  });
