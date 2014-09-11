(function ()
{

    'use strict';

    function TestDetailsCtrl($scope, TestDAO, paginationSupport, ConfirmAction)
    {
        var ctrl = this;

        this.selectedTest = [];
        this.filter = {searchQuery: null};
        this.editMode = false;

        $scope.$on('test-selected', function (event, id)
        {
            TestDAO.get(id).then(function (test)
            {
                ctrl.editMode = false;
                ctrl.selectedTest = test;
                refreshTasks();
            });
        });

        this.saveTest = function ()
        {
            TestDAO.save(ctrl.selectedTest).then(function () {
                $scope.$emit('test-saved', ctrl.selectedTest.id);
                ctrl.toggleEditMode();
            });
        };

        this.toggleEditMode = function () {
            ctrl.editMode = !ctrl.editMode;
        };

        this.deleteTest = function (id)
        {
            ConfirmAction.open('Remove Test', 'Are you sure?').result.then(function () {
                ctrl.selectedTest = null;
                TestDAO.remove(id).then($scope.$emit('test-deleted', id));
            });
        };

        this.isTasksTableEmpty = function () {
            return !ctrl.taskList || ctrl.taskList.length === 0;
        };

        this.isTestEmpty = function () {
            return !ctrl.taskList || ctrl.filter.searchQuery == null;
        };

        this.removeTaskFromTest = function (taskId)
        {
            ConfirmAction.open('Remove Task', 'Are you sure?').result.then(function () {
                TestDAO.removeTask(ctrl.selectedTest.id, taskId).then(refreshTasks);
            });

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
    module.controller('TestDetailsCtrl', [ '$scope', 'TestDAO', 'paginationSupport', 'ConfirmAction', TestDetailsCtrl]);
})();
