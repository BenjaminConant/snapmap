'use strict';

describe('Directive: reviews', function () {

  // load the directive's module and view
  beforeEach(module('snapmapApp'));
  beforeEach(module('app/reviews/reviews.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reviews></reviews>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the reviews directive');
  }));
});