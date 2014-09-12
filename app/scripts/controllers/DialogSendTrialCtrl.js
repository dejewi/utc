// don't wrap it into function


var SendTrialDialog = function ($modalInstance,test) {
    'use strict';

    this.test = test;
    this.trial = [];

    this.send = function () {
        // performe backend send query
        $modalInstance.close([this.test,this.trial]);
    };

    this.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
angular.module('utcApp').controller('SendTrialDialog',['$modalInstance','test',SendTrialDialog]);