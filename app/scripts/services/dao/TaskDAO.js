(function ()
{
    'use strict';

    function TaskDAO($resource)
    {
        var api = $resource('/api/task/:a', null, {
            query: {isArray: false}
        });

        return {
            query: function (filter)
            {
                return api.query(filter).$promise;
            },
            save: function(data)
            {
                return api.save(data).$promise;
            },
            remove: function(id)
            {
                return api.remove({a: id}).$promise;
            }

        };
    }

    angular.module('utcApp').factory('TaskDAO', ['$resource', TaskDAO]);
})();
