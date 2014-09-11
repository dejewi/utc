(function ()
{
    'use strict';

    function TestDAO($resource)
    {
        var api = $resource('/api/test/:a/:b/:c', {a: '@id'}, {
            query: {isArray: false},
            invite: {method: 'POST', params: {b: 'invite'}},
            getTasks: {method: 'GET', params: {b: 'task'}},
            removeTask: {method: 'DELETE', params: {b: 'task'}}
        });

        return {
            query: function (filter)
            {
                return api.query(filter).$promise;
            },
            get: function (id)
            {
                return api.get({a: id}).$promise;
            },
            save: function (test) {
                return api.save(test).$promise;
            },
            remove: function (id)
            {
                return api.remove({a: id}).$promise;
            },
            invite: function (testId, email)
            {
                return api.invite({a: testId, c: email}).$promise;
            },
            getTasks: function (id, filter)
            {
                filter = angular.copy(filter);
                filter.a = id;
                return api.getTasks(filter).$promise;
            },
            removeTask: function(testId, taskId)
            {
                return api.removeTask({a: testId, c: taskId}).$promise;
            }
        };
    }

    angular.module('utcApp').factory('TestDAO', ['$resource', TestDAO]);
})();

