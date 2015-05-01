'use strict';

angular.module('snapmapApp')
  .controller('UserCtrl', function ($scope, $stateParams, store, UserFactory, $rootScope, Auth) {

    var user;
    var vm = this; 

    $scope.reviews;
    $scope.stores;
    $scope.currentUser = Auth.getCurrentUser();

    if (!$scope.currentUser.avatar) {
      $scope.currentUser.avatar = 'http://lorempixel.com/100/100/abstract/';
    }

    function ensureUser(){
      if (!user) user = Auth.getCurrentUser()._id; 
      else user = user;
    }

    $rootScope.$on('user:loggedIn', function(){
      console.log('---------------------------')
      ensureUser(); 
    })

    ensureUser();

    console.log('User factory: ', typeof UserFactory.getReviews)

    vm.retrieveReviews = function(){
      UserFactory.getReviews()
        .then(function(reviews){
          console.log('reviews: ', reviews)
          reviews.map(function (review){
            review.staricons = [];
            for (var i = 0; i < review.stars; i++){
              review.staricons.push(i);
            }
            return review;
          });
          $scope.reviews = reviews;
          console.log('scoped reviews: ', $scope.reviews)
        });
    }

    vm.retrieveTopStores = function(){
      UserFactory.getStores()
      .then(function(storesArr){
        console.log('stores: ', storesArr)
        var uniqueStores = [];
        storesArr.forEach(function (store){
          var unique = true;
          for (var i = 0; i < uniqueStores.length; i++){
            if (uniqueStores[i].name === store.name) {
              unique = false;
              break;
            }
          }
          if (unique) {
            store.averageRating = Number(store.averageRating);
            uniqueStores.push(store);
          }
        });
        $scope.stores = uniqueStores;
      });
    }

    vm.retrieveTopStores()

    vm.retrieveReviews()


  });