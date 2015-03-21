angular.module('snapmapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stores', {
        url: '/:stores',
        templateUrl: 'app/stores/stores.html',
        controller: 'StoreCtrl'
      });
  });