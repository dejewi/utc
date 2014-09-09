'use strict';

/**
 * @ngdoc function
 * @name utcApp.controller:TestlistCtrl
 * @description
 * # TestlistCtrl
 * Controller of the utcApp
 */
angular.module('utcApp')
  .controller('TestlistCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
