'use strict';

describe('Service: ReviewFactory', function () {

  // load the service's module
  beforeEach(module('snapmapApp'));

  // instantiate service
  var ReviewFactory;
  beforeEach(inject(function (_ReviewFactory_) {
    ReviewFactory = _ReviewFactory_;
  }));

  it('should do something', function () {
    expect(!!ReviewFactory).toBe(true);
  });

});
