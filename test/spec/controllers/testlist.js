'use strict';

describe('Controller: TestlistCtrl', function () {

  // load the controller's module
  beforeEach(module('utcApp'));

  var TestlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestlistCtrl = $controller('TestlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
