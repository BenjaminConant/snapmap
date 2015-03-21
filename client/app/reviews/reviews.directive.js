'use strict';

angular.module('snapmapApp')
  .directive('reviews', function (ReviewFactory, Auth) {
    return {
      templateUrl: 'app/reviews/reviews.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	scope.newReview ={};
      	scope.reviews = [
      	{user: 'John Sample', date: '10-12-14', text: 'Great stuff, this place was awesome!', staricons: [1, 2, 3]},
      	{user: 'Jin Critic', date: '2-15-15', text: 'I was treated terribly, never coming back!!', staricons: [1]}
        ];
      	//by id
      	scope.submitReview = function (review){
          var obj = {
            stars: review.rating,
            text: review.text,
            store: scope.store._id,
            date: new Date(),
            user: 'New User',
            staricons: []
          }
          for (var i = 0; i < review.rating; i++){
            obj.staricons.push(i);
          };
          scope.reviews.unshift(obj);
        }
    }
  }
});