angular
  .module('beachbody')
  .service('DataService', function($http) {
    'use strict';

    var AUTH_CODE = 'BBOD123';
    var URL_GET_TRAINERS = 'data/trainers.json';
    var EVENTS = {
      GET_TRAINERS_SUCCESS: 'GET_TRAINERS_SUCCESS',
      GET_TRAINERS_ERROR: 'GET_TRAINERS_ERROR'
    };

    return {
      events: EVENTS,
      getTrainers: function($scope) {
        $http.get(URL_GET_TRAINERS, {
          headers: {
            Authorization: AUTH_CODE,
            cache: true
          }
        })
        .success(function(data) {
          $scope.$emit(EVENTS.GET_TRAINERS_SUCCESS, data);
        })
        .error(function() {
          $scope.$emit(EVENTS.GET_TRAINERS_ERROR);
        });
      }
    };
  });
