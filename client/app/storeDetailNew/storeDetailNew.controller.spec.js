'use strict';

describe('Controller: StoreDetailNewCtrl', function () {

  // load the controller's module
  beforeEach(module('snapmapApp'));

  var StoreDetailNewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreDetailNewCtrl = $controller('StoreDetailNewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
