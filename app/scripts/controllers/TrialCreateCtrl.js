(function () {
    'use strict';

    function TrialCreateCtrl($scope,$modal) {

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

            modalInstance.result.then(function (returned) {
                console.log('Test invitation sent sent');
                console.log(returned);
            },function () {
                console.log('Dialog canceled');
            });
        };
    }

    var module = angular.module('utcApp');
    module.controller('TrialCreateCtrl', ['$scope','$modal',TrialCreateCtrl]);

})();
