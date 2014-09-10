(function ()
{
    'use strict';

    function TrialDAO($resource)
    {
        var api = $resource('/api/trial/:a', null, {
            query: {isArray: false}
        });

        return {
            query: function (filter)
            {
                return api.query(filter).$promise;
            }
        };
    }

    angular.module('utcApp').factory('TrialDAO', ['$resource', TrialDAO]);
})();
