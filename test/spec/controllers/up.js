'use strict';

describe('Controller: UpCtrl', function () {

  // load the controller's module
  beforeEach(module('utcApp'));

  var UpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpCtrl = $controller('UpCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
