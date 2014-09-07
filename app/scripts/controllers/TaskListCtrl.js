(function ()
{
    'use strict';

    function TaskListCtrl(TaskDAO, paginationSupport)
    {
        var ctrl = this;
        this.filter = {searchQuery: ''};
        paginationSupport(this, function (callback)
        {
            TaskDAO.query(ctrl.filter).then(function (result)
            {
                callback(result.resultCount);
                ctrl.list = result.resultList;
            });
        })();


    }


    var module = angular.module('utcApp');
    module.controller('TaskListCtrl', [ 'TaskDAO', 'paginationSupport', TaskListCtrl]);

})();
