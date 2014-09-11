(function ()
{
    'use strict';

    function loggingInterceptorFactory($log) {
        return {
            request: function (config) {
                if (!config.url.match(/.*\.html/)) {
                    var message = config.method + ' ' + config.url + ' ' + JSON.stringify(config.headers);
                    if (null != config.data) {
                        message += '\n' + JSON.stringify(config.data);
                    }
                    $log.debug(message);
                }
                return config;
            }
        };
    }

    /**
     * @ngdoc overview
     * @name utcApp
     * @description
     * # utcApp
     *
     * Main module of the application.
     */
    /*global setupBackendMock*/
    var module = angular.module('utcApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.select2']);
    module.config(function ($httpProvider, $provide, $routeProvider)
    {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

        /**
         * Browser logs only real XHR requests so in order to log requests that will be mocked we need to register interceptor
         */
        $httpProvider.interceptors.push(['$log', loggingInterceptorFactory]);

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
            .when('/trial/create', {
              templateUrl: 'views/trialCreate.html',
              controller: 'TrialCreateCtrl as trialCreate'
            })
            .when('/trials', {
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
