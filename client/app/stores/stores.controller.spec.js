'use strict';

describe('Controller: StoresCtrl', function () {

  // load the controller's module
  beforeEach(module('snapmapApp'));

  var StoresCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoresCtrl = $controller('StoresCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
