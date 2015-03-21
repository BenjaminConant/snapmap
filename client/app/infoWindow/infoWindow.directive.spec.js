'use strict';

describe('Directive: infoWindow', function () {

  // load the directive's module and view
  beforeEach(module('snapmapApp'));
  beforeEach(module('app/infoWindow/infoWindow.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<info-window></info-window>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the infoWindow directive');
  }));
});