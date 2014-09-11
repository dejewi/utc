(function ()
{
    'use strict';

    function TestListCtrl($scope, TestDAO, paginationSupport)
    {
        var ctrl = this;

        this.list = [];
        this.filter = {searchQuery: null, maxResults: 8};

        this.isTestsTableEmpty = function ()
        {
            return !ctrl.list || ctrl.list.length === 0;
        };

        this.selectTest = function (id)
        {
            $scope.$broadcast('test-selected', id);
            ctrl.selectedId = id;
        };

        this.isTestSelected = function (id)
        {
            return id === ctrl.selectedId;
        };

        this.createTest = function ()
        {
            var test = {title: ctrl.filter.searchQuery, description: 'A new test, maybe some description?', taskNo: 0};
            TestDAO.save(test).then(function (data) {
                refreshTests();
                ctrl.selectTest(data.id);
            });
        };

        var refreshTests = paginationSupport(this, function (callback)
        {
            TestDAO.query(ctrl.filter).then(function (result)
            {
                callback(result.resultCount);
                ctrl.list = result.resultList;
            });
        });

        $scope.$on('test-deleted', refreshTests);
        $scope.$on('test-saved', refreshTests);

        refreshTests();
    }

    var module = angular.module('utcApp');
    module.controller('TestListCtrl', [ '$scope', 'TestDAO', 'paginationSupport', TestListCtrl]);

})();
