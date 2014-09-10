(function () {
    'use strict';

    function TrialListCtrl(TrialDAO, paginationSupport, $filter) {
        var ctrl = this;
        var orderBy = $filter('orderBy');
        var reverseTmp;
        this.filter = {searchQuery: '', maxResults: 5};
        paginationSupport(this, function (callback) {
            TrialDAO.query(ctrl.filter).then(function (result) {

                console.log(result);
                callback(result.total);
                ctrl.list = result.results;
                //ctrl.order('student',false);
            });
        })();

        this.isOpen = function (status) {
            if ('open' == status) {
                return true;
            } else {
                return false;
            }
        };

        this.isFailed = function (status) {
            if ('failed' == status) {
                return true;
            } else {
                return false;
            }
        };

        this.isPassed = function (status) {
            if ('passed' == status) {
                return true;
            } else {
                return false;
            }
        };

        this.order = function (predicate) {
            if (reverseTmp) {
                ctrl.list = orderBy(ctrl.list, predicate, true);
                reverseTmp = false;
            } else {
                ctrl.list = orderBy(ctrl.list, predicate, false);
                reverseTmp = true;
            }

        }


    }

    var module = angular.module('utcApp');
    module.controller('TrialListCtrl', [ 'TrialDAO', 'paginationSupport', '$filter', TrialListCtrl]);

})();