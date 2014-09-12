(function () {
    'use strict';

    function TaskListCtrl(TaskDAO, TestDAO, paginationSupport) {
        var ctrl = this;
        ctrl.selected = [];

        ctrl.tasks = {
            filter: {query: null, size: 5}
        };

        ctrl.tests = {
            filter: {query: null}
        };

        var refreshList = paginationSupport(ctrl.tasks, function (callback) {
            TaskDAO.query(ctrl.tasks.filter).then(function (result) {
                ctrl.tasks.list = result.results;
                callback(result.total);
            });
        });

        this.suggestTests = function(query) {
            return TestDAO.query({query:query,size:10}).then(function (result) {
                return result.results;
            });

        };

        this.assignTaskToTest = function(testId) {
            var tasks = [];
            angular.forEach(ctrl.tasks.list, function (value, key) {
                if(task.selected) {
                    tasks.push(task)
                }
            });

            TaskDAO.assignTasks(testId,tasks)
        };

        this.deleteTask = function (id) {
            TaskDAO.remove(id).then(refreshList);
        };

        refreshList();
    }

    var module = angular.module('utcApp');
    module.controller('TaskListCtrl', ['TaskDAO', 'TestDAO', 'paginationSupport', TaskListCtrl]);

})();
