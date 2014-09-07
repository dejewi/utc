'use strict';

/**
 * @ngdoc function
 * @name utcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the utcApp
 */
angular.module('utcApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
