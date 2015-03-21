'use strict';

describe('Controller: BackendtestCtrl', function () {

  // load the controller's module
  beforeEach(module('snapmapApp'));

  var BackendtestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BackendtestCtrl = $controller('BackendtestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
