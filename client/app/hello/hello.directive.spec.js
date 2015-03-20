'use strict';

describe('Directive: hello', function () {

  // load the directive's module and view
  beforeEach(module('snapmapApp'));
  beforeEach(module('app/hello/hello.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hello></hello>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the hello directive');
  }));
});