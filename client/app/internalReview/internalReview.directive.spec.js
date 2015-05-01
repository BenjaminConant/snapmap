'use strict';

describe('Directive: internalReview', function () {

  // load the directive's module and view
  beforeEach(module('snapmapApp'));
  beforeEach(module('app/internalReview/internalReview.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<internal-review></internal-review>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the internalReview directive');
  }));
});