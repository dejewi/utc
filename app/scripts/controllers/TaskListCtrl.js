(function ()
{
    'use strict';

    function TaskListCtrl(TaskDAO, paginationSupport, ConfirmAction) {
        var ctrl = this;
        ctrl.filter = {searchQuery: null, maxResults: 5};

        var refreshList = paginationSupport(this, function (callback) {
            TaskDAO.query(ctrl.filter).then(function(result){
                ctrl.list = result.resultList;
                callback(result.resultCount);
            });

        });

        this.deleteTask = function(id){
            ConfirmAction.open('Remove Task', 'Are you sure?').result.then(function () {
                TaskDAO.remove(id).then(refreshList);
            });

        };

        refreshList();
    }

    var module = angular.module('utcApp');
    module.controller('TaskListCtrl', [ 'TaskDAO', 'paginationSupport', 'ConfirmAction', TaskListCtrl]);

})();
