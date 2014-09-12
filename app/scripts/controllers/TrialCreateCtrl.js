(function () {
    'use strict';

    function TrialCreateCtrl($modal) {

        var ctrl = this;
        this.test = {id:1,title:'JavaScript test for beginners'};

        this.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/dialogSendTrial.html',
                controller: 'SendTrialDialog as trialSender',
                resolve: {
                    test: function () {
                        return ctrl.test;
                    }
                }
            });


        };
    }

    var module = angular.module('utcApp');
    module.controller('TrialCreateCtrl', ['$scope','$modal',TrialCreateCtrl]);

})();
