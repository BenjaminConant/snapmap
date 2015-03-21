'use strict';

describe('Service: StoreFactory', function () {

  // load the service's module
  beforeEach(module('snapmapApp'));

  // instantiate service
  var StoreFactory;
  beforeEach(inject(function (_StoreFactory_) {
    StoreFactory = _StoreFactory_;
  }));

  it('should do something', function () {
    expect(!!StoreFactory).toBe(true);
  });

});
