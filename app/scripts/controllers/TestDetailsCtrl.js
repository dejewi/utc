(function ()
{

    'use strict';

    function TestDetailsCtrl($scope, TestDAO, paginationSupport)
    {
        var ctrl = this;

        this.selectedTest = [];
        this.filter = {searchQuery: null};

        $scope.$on('test-selected', function (event, id)
        {
            TestDAO.get(id).then(function (test)
            {
                ctrl.selectedTest = test;
                refreshTasks();
            });
        });

        this.deleteTest = function (id)
        {
            ctrl.selectedTest = null;
            TestDAO.remove(id).then($scope.$emit('test-deleted', id));
        };

        this.isTaskOnTest = function () {
            return !ctrl.taskList || ctrl.taskList.length === 0;
        };

        this.removeTaskFromTest = function (taskId)
        {
            TestDAO.removeTask(ctrl.selectedTest.id, taskId).then(refreshTasks);
        };

        var refreshTasks = paginationSupport(this, function (callback)
        {
            TestDAO.getTasks(ctrl.selectedTest.id, ctrl.filter).then(function (tasks)
            {
                callback(tasks.resultCount);
                ctrl.taskList = tasks.resultList;
            })
        });
    }

    var module = angular.module('utcApp');
    module.controller('TestDetailsCtrl', [ '$scope', 'TestDAO', 'paginationSupport', TestDetailsCtrl]);
})();
