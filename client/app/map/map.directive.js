'use strict';

angular.module('snapmapApp')
  .directive('map', function () {
    return {
      templateUrl: 'app/map/map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });