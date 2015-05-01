'use strict';

angular.module('snapmapApp')
  .controller('StoreDetailNewCtrl', function ($scope, $stateParams, $http, Auth) {
    console.log($stateParams.id);
    $scope.currentUser = Auth.getCurrentUser();
    if (!$scope.currentUser.avatar) {
      var randomLetter = Math.floor(Math.random() * 20);
      randomLetter = String.fromCharCode(randomLetter);
      console.log(randomLetter);
      $scope.currentUser.avatar = 'http://api.adorable.io/avatars/150/a' + randomLetter + 'ott@adorable.io.pngrand';
    }
  });
