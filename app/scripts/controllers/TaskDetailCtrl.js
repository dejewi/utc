(function () {
    'use strict';

    angular.module('utcApp').controller('TaskDetailCtrl', function ($scope,$routeParams,$location,TaskDAO) {
        var ctrl = this;

        this.mode='display';
        this.isCreating=false;
        this.task={};

        this.tagsTypeahead=function (query) {
            var data=[
                {id: 1, text: 'javascript'},
                {id: 2, text: 'angular'},
                {id: 3, text: 'bootstrap'},
                {id: 4, text: 'node'},
                {id: 5, text: 'grunt'},
                {id: 6, text: 'git'}
            ];
            query.callback({results: data});
        };

        this.tagsTypeaheadConfig = {
            query: this.tagsTypeahead,
            multiple: true,
            minimumInputLength: 1,
            maximumSelectionSize: 10
        };

        this.init = function(){
            if($routeParams.id=='create'){
                this.task={};
                this.mode="edit";
                this.isCreating=true;
            }else{
                TaskDAO.query({a:$routeParams.id}).then(function(task){
                    ctrl.isCreating=false;
                    ctrl.task=task;
                    ctrl.mode="display"
                });
            }
        };

        this.toggleMode = function(){
            if(this.mode=='display'){
                this.mode='edit';
            }else if(this.mode=='edit'){
                this.mode='display';
            }
            return this.mode;
        };

        this.save = function(){
            if(this.isCreating){ // create new task
                TaskDAO.save(this.task);
                $location.path('/tasks');

            }else{ // update existing task
                TaskDAO.save(this.task);
                this.mode='display';
            }
        };

        this.discard = function(){
            if(this.isCreating){
                this.task={};
            }else{
                if(this.mode=='edit'){
                    this.mode = 'display';
                }else{
                    $location.path('/tasks');
                }
            }
        };

        this.init();

    });

})();
