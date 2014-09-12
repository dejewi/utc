describe('Controller: TrialcreateCtrl', function () {
    'use strict';
    // load the controller's module
    beforeEach(module('utcApp'));

    var TrialcreateCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TrialcreateCtrl = $controller('TrialcreateCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
