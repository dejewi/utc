// don't wrap it into function

'use strict';

var SendTrialDialog = function ($modalInstance,test) {

    this.test = test;
    this.trial = [];

    this.send = function () {
        // performe backend send query
        console.log('send');
        $modalInstance.close([this.test,this.trial]);
    };

    this.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
angular.module('utcApp').controller('SendTrialDialog',['$modalInstance','test',SendTrialDialog])