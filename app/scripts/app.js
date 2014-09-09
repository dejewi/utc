(function ()
{
    'use strict';

    /**
     * @ngdoc overview
     * @name utcApp
     * @description
     * # utcApp
     *
     * Main module of the application.
     */
    var module = angular.module('utcApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap']);
    module.config(function ($httpProvider, $provide, $routeProvider)
    {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/taskdetail', {
              templateUrl: 'views/taskdetail.html',
              controller: 'TaskdetailCtrl as taskdetail'
            })
            .when('/tests', {
              templateUrl: 'views/testlist.html',
              controller: 'TestlistCtrl as testlist'
            })
            .when('/testdetail', {
              templateUrl: 'views/testdetail.html',
              controller: 'TestdetailCtrl as testdetail'
            })
            .when('/trialcreate', {
              templateUrl: 'views/trialcreate.html',
              controller: 'TrialcreateCtrl as trialcreate'
            })
            .when('/trails', {
              templateUrl: 'views/triallist.html',
              controller: 'TriallistCtrl as triallist'
            })
            .when('/tasks', {
              templateUrl: '/views/tasklist.html',
              controller: 'TaskListCtrl as tasklist'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
    module.run(function ($httpBackend)
    {
        setupBackendMock($httpBackend);
    });

})();
