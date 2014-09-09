'use strict';

describe('Controller: TriallistCtrl', function () {

  // load the controller's module
  beforeEach(module('utcApp'));

  var TriallistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TriallistCtrl = $controller('TriallistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
