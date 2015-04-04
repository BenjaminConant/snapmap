'use strict';

angular.module('snapmapApp')
  .controller('UserCtrl', function ($scope, $stateParams, store, UserFactory, $rootScope, Auth) {

    var user;
    var vm = this; 

    $scope.reviews; 

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

          $scope.reviews = reviews; 
          console.log('scoped reviews: ', $scope.reviews)
        })
    }

    vm.retrieveTopStores = function(){
      UserFactory.getStores()
      .then(function(storesArr){
        console.log('stores: ', storesArr)
      })
    }

    vm.retrieveTopStores()

    vm.retrieveReviews()


  });