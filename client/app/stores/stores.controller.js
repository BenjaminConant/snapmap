'use strict';

angular.module('snapmapApp')
  .controller('StoresCtrl', function ($scope, $stateParams, store, ReviewFactory, Auth, $http) {

    ///////////////// This controller controls /store/:id page ///////////////

    var vm = this; 

    // this function loads the store info 

    // vm.getStore = function(){
    //   store.getStore($stateParams.storeId).then(function(store, err){
    //   	if(store){
    //       // cope for virtual persistence 
    //       var store = store; 
    //   		$scope.store = store; //maybe make explicit
    //       var ratingHolder = $scope.store.averageRating;
    //       $scope.store.averageRating = [];
    //       for (var i = 0; i < ratingHolder; i++) {
    //         $scope.store.averageRating.push(i);
    //       }
    //       console.log($scope.store);
    //     }
    //   })
    // }

    //get reviews from id (possibly the same)


    $scope.testGooglePlace = function () {
      return $http.get('/api/placeDetails/553bbfa3d25374388ffcacd5').then(function (place) {
        return place.data;
      })
    }

    var convertTime = function (time) {
      var tod = 'AM';
      var hours = time.split('');
      var minutes = hours.splice(2).join('');
      if (hours[0] * 1 === 0) hours = hours.splice(1).join('');
      else hours = hours.join('');
      if (hours > 12) {
        hours -= 12;
        tod = 'PM';
      }
      return hours + ':' + minutes + tod;
    }
    var checkIfOpened = function (open, close) {
      if (new Date().getUTCHours() >= (open.substring(0, 2) * 1) && new Date().getUTCHours() < (close.substring(0, 2) * 1)) {
        $scope.isOpen = 'Open'
      }
    }

    $scope.testGooglePlace().then(function (place) {
      $scope.store = place;
      console.log($scope.store);
      $scope.store.hrefTel = $scope.store.formatted_phone_number.split("(").join("").split(")").join("").split("-").join("").split(" ").join("");
      $scope.today = new Date();
      $scope.today = $scope.today.getDay();
      $scope.store.stars = [];
      if ($scope.store.opening_hours.periods) {
        $scope.isOpen = 'Closed';
        if ($scope.store.opening_hours.periods[$scope.today]) {
          checkIfOpened($scope.store.opening_hours.periods[$scope.today].open.time, $scope.store.opening_hours.periods[$scope.today].close.time);
          $scope.todayOpen = convertTime($scope.store.opening_hours.periods[$scope.today].open.time);
          $scope.todayClose = convertTime($scope.store.opening_hours.periods[$scope.today].close.time);
        }
        $scope.store.opening_hours.periods.forEach(function (hours) {
          hours.open.time = convertTime(hours.open.time);
          hours.close.time = convertTime(hours.close.time);
        });
        console.log($scope.store.opening_hours.periods);
      }
      $scope.store.averageRating = 0;
      $scope.store.reviews.forEach(function (review) {
        $scope.store.averageRating += review.rating;
        review.time = new Date(review.time * 1000);
        review.staricons = [];
        for (var i = 0; i < review.rating; i++) {
          review.staricons.push(i);
        }
      });
      for (var i = 0; i < ($scope.store.averageRating / $scope.store.reviews.length); i++) {
        $scope.store.stars.push(i);
      }
    });

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

      //vm.getStore()
      vm.getReviews()


  });
