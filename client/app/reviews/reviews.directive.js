'use strict';

angular.module('snapmapApp')
  .directive('reviews', function (ReviewFactory, Auth, $rootScope) {

    var user;

    function ensureUser(){
      if (!user) user = Auth.getCurrentUser()._id; 
      else user = user
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

      	scope.newReview ={};
      	// scope.reviews = [
      	// {user: 'John Sample', date: '10-12-14', text: 'Great stuff, this place was awesome!', staricons: [1, 2, 3]},
      	// {user: 'Jin Critic', date: '2-15-15', text: 'I was treated terribly, never coming back!!', staricons: [1]}
       //  ];
      	//by id
      	scope.submitReview = function (review){
          var obj = {
            stars: review.rating,
            text: review.text,
            store: scope.store._id, 
            user: user
          }

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