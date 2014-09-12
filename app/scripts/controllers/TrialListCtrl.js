(function () {
    'use strict';

    function TrialListCtrl(TrialDAO, paginationSupport)
    {
        var ctrl = this;

        this.filter = {searchQuery: '', maxResults: 5};
        paginationSupport(this, function (callback) {
            TrialDAO.query(ctrl.filter).then(function (result) {
                callback(result.total);
                ctrl.list = result.results;
            });
        })();

        this.isOpen = function (status) {
            return 'open' === status;
        };

        this.isFailed = function (status) {
            return 'failed' === status;
        };

        this.isPassed = function (status) {
            return 'passed' === status;
        };

    }

    var module = angular.module('utcApp');
    module.controller('TrialListCtrl', [ 'TrialDAO', 'paginationSupport', '$filter', TrialListCtrl]);

})();