describe('Controller: TaskdetailCtrl', function () {
    'use strict';
    // load the controller's module
    beforeEach(module('utcApp'));

    var TaskdetailCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TaskdetailCtrl = $controller('TaskdetailCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
