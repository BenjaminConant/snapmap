'use strict';

angular.module('snapmapApp')
  .directive('internalReview', function (ReviewFactory, Auth, $rootScope) {
    
    var user;

    function ensureUser(){
      user = Auth.getCurrentUser()._id; 
    }

    $rootScope.$on('user:loggedIn', function(){
      console.log('---------------------------')
      ensureUser(); 
    })

    ensureUser();


    return {
      templateUrl: 'app/reviews/reviews.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.currentUser = Auth.getCurrentUser();
        if (!scope.currentUser.avatar) {
          scope.currentUser.avatar = 'http://lorempixel.com/100/101/abstract/';
        }
        scope.submitReview = function (review){
          var obj = {
            stars: review.rating,
            text: review.text,
            store: scope.store._id 
            // user: user --- we get user on the backend: req.user
          }
          scope.review = {}
          ReviewFactory.submitReview(obj).then(function (data){
            console.log('data: ', data)
            scope.store.averageRating = [];
            for (var i = 0; i < data.finalStore.averageRating; i++){
              scope.store.averageRating.push(i);
            }
            // must reassign to create new object as mongoose object is immuatable
            // unless you call .toObject() on it, but if you call .toObject() on it
            // you lose any virtual fields, which are toJSON-ed
            var review = data.finalReview;
            review.staricons = [];
            for (var i = 0; i < review.stars; i++){
              review.staricons.push(i);
            };
            scope.reviews.unshift(review);
          });

        }


    }
  }
  });