'use strict';

angular.module('snapmapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('backend', {
        url: '/backend',
        templateUrl: 'app/backendtest/backend.html',
        controller: 'BackendtestCtrl'
      });
  });