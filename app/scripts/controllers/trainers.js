angular
  .module('beachbody')
  .controller('TrainersController', function($scope, DataService) {
    'use strict';

    $scope.$on(DataService.events.GET_TRAINERS_SUCCESS, function(event, data) {
      angular.forEach(data.items, function(value) {
        try {
          value.image = '//' + value.images['thumbnail.stv.main'].url;
        } catch(e) {
          
        }
      });

      $scope.trainers = (data.items || []);
      $scope.error = null;
    });

    $scope.$on(DataService.events.GET_TRAINERS_ERROR, function() {
      $scope.trainers = [];
      $scope.error = 'Sorry, we could not retrieve the info';
    });

    DataService.getTrainers($scope);
  });
