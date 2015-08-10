angular
  .module('beachbody', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      'use strict';

      $routeProvider.
        when('/', {
          templateUrl: 'views/trainers.html',
          controller: 'TrainersController'
        }).
        otherwise({
          redirectTo: '/'
        });
  }]);
