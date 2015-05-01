'use strict';

angular.module('snapmapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('storeDetailNew', {
        url: '/storeDetailNew/:id',
        templateUrl: 'app/storeDetailNew/storeDetailNew.html',
        controller: 'StoreDetailNewCtrl'
      });
  });