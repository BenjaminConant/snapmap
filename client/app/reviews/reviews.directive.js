'use strict';

angular.module('snapmapApp')
  .directive('reviews', function (ReviewFactory, Auth) {
    return {
      templateUrl: 'app/reviews/reviews.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	scope.newReview ={};
      	scope.reviews = [
      	{user: 'John Sample', date: '10-12-14', text: 'Great stuff, this place was awesome!'},
      	{user: 'Jin Critic', date: '2-15-15', text: 'I was treated terribly, never coming back!!'}];
      	//by id
      	ReviewFactory.getReviews().then(function(response, err){
      		if(err) console.log(err);
      		scope.reviews=response;
      	})
      	Auth.getCurrentUser().then(function(user){
      		if(user){
      			scope.user = user;
      		}
      	})
      	scope.submit = function(){
      		Auth.getCurrentUser().then(function(user){

      			ReviewFactory.createReview(scope.newReview, user).then(function(response){
      				scope.reviews.push(response);
      		});
      		
      	});
      }
  }
}});