'use strict';

describe('Directive: map', function () {

  // load the directive's module and view
  beforeEach(module('snapmapApp'));
  beforeEach(module('app/map/map.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<map></map>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the map directive');
  }));
});