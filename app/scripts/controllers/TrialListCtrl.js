(function () {
    'use strict';

    function TrialListCtrl(TrialDAO, paginationSupport, $filter) {
        var ctrl = this;
        var orderBy = $filter('orderBy');
        var reverseTmp;
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

        this.order = function (predicate) {
            if (reverseTmp) {
                ctrl.list = orderBy(ctrl.list, predicate, true);
                reverseTmp = false;
            } else {
                ctrl.list = orderBy(ctrl.list, predicate, false);
                reverseTmp = true;
            }
        };
    }

    var module = angular.module('utcApp');
    module.controller('TrialListCtrl', [ 'TrialDAO', 'paginationSupport', '$filter', TrialListCtrl]);

})();