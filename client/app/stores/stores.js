angular.module('snapmapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stores', {
        url: '/store/:storeId',
        templateUrl: 'app/stores/store.html',
        controller: 'StoresCtrl'
      });
  });