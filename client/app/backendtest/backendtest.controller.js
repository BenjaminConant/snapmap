'use strict';

angular.module('snapmapApp')
  .controller('BackendtestCtrl', function ($scope, store) {
    $scope.message = 'Hello';


    var stores = store.someMethod();

    console.log('stores here: ', stores)
  });
