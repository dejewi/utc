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
    var module = angular.module('utcApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.select2']);
    module.config(function ($httpProvider, $provide, $routeProvider)
    {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/task/:id', {
              templateUrl: 'views/taskDetail.html',
              controller: 'TaskDetailCtrl as taskDetail'
            })
            .when('/tests', {
              templateUrl: 'views/testList.html',
              controller: 'TestListCtrl as testList'
            })
            .when('/testdetail', {
              templateUrl: 'views/testDetail.html',
              controller: 'TestDetailCtrl as testDetail'
            })
            .when('/trial/create', {
              templateUrl: 'views/trialCreate.html',
              controller: 'TrialCreateCtrl as trialCreate'
            })
            .when('/trails', {
              templateUrl: 'views/trialList.html',
              controller: 'TrialListCtrl as trialList'
            })
            .when('/tasks', {
              templateUrl: '/views/taskList.html',
              controller: 'TaskListCtrl as taskList'
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
