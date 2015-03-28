'use strict';

angular.module('snapmapApp')
  .directive('reviews', function (ReviewFactory, Auth, $rootScope) {

    var user;

    function ensureUser(){
      user = Auth.getCurrentUser()._id; 
      console.log('user: ', user)
      // else user = user
    }

    $rootScope.$on('user:loggedIn', function(){
      console.log('---------------------------')
      ensureUser(); 
    })

    ensureUser();

    console.log('USER: ', user)

    return {
      templateUrl: 'app/reviews/reviews.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        console.log('on scope :', scope)

      	scope.submitReview = function (review){
          var obj = {
            stars: review.rating,
            text: review.text,
            store: scope.store._id 
            // user: user
          }
          scope.review = {}
          ReviewFactory.submitReview(obj).then(function (populatedReview){
            console.log('data here!!: ', populatedReview);
            // must reassign to create new object as mongoose object is immuatable
            // unless you call .toObject() on it, but if you call .toObject() on it
            // you lose any virtual fields, which are toJSON-ed
            var review = populatedReview;
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