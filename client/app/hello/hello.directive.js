'use strict';

angular.module('snapmapApp')
  .directive('hello', function () {
    return {
      templateUrl: 'app/hello/hello.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });