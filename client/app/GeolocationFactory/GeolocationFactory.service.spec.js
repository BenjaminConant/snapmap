'use strict';

describe('Service: GeolocationFactory', function () {

  // load the service's module
  beforeEach(module('snapmapApp'));

  // instantiate service
  var GeolocationFactory;
  beforeEach(inject(function (_GeolocationFactory_) {
    GeolocationFactory = _GeolocationFactory_;
  }));

  it('should do something', function () {
    expect(!!GeolocationFactory).toBe(true);
  });

});
