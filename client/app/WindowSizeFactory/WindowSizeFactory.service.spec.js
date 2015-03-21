'use strict';

describe('Service: WindowSizeFactory', function () {

  // load the service's module
  beforeEach(module('snapmapApp'));

  // instantiate service
  var WindowSizeFactory;
  beforeEach(inject(function (_WindowSizeFactory_) {
    WindowSizeFactory = _WindowSizeFactory_;
  }));

  it('should do something', function () {
    expect(!!WindowSizeFactory).toBe(true);
  });

});
