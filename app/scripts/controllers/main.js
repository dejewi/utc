'use strict';

/**
 * @ngdoc function
 * @name utcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the utcApp
 */
angular.module('utcApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
