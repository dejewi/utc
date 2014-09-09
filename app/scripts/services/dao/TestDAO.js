(function ()
{
    'use strict';

    function TestDAO($resource)
    {
        var api = $resource('/api/test/:a', null, {
            query: {isArray: false}
        });

        return {
            query: function (filter)
            {
                return api.query(filter).$promise;
            }
        };
    }

    angular.module('utcApp').factory('TestDAO', ['$resource', TestDAO]);
})();
