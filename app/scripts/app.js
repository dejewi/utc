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

        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

        $routeProvider.when('/tasks', {
            templateUrl: '/views/taskList.html',
            controller: 'TaskListCtrl as tasks'
        });
    });
    module.run(function ($httpBackend)
    {
        setupBackendMock($httpBackend);
    });

})();
