'use strict';

angular.module('snapmapApp')
  .directive('infoWindow', function () {
    return {
      templateUrl: 'app/infoWindow/infoWindow.html',
      restrict: 'EA',
      scope: {
      	location: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });