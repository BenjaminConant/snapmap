'use strict';

angular.module('snapmapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('review', {
        url: '/reviews',
        templateUrl: 'app/reviews/reviews.html',
        controller: 'ReviewCtrl'
      });
  });