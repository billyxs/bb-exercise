// testing controller
describe('TrainersController', function() {
  'use strict';
   var $rootScope, createController, DataService;

   // Set up the module
   beforeEach(module('beachbody'));

   var mockTrainersData = {items: [
     {name: 'Trainer 1',
       "images": {
         "thumbnail.stv.main": {
           "url": "imgclub.teambeachbody.com\\/club-teambeachbody\\/image\\/upload\\/v1433200373\\/Trainer\\/TonyHorton_Trainer_STV_Thumb_540x672_20150630.jpg"
         }
       }
     },
     { name: 'Trainer 2',
       "images": {
         "thumbnail.stv.main": {
           "url": "imgclub.teambeachbody.com\\/club-teambeachbody\\/image\\/upload\\/v1433200373\\/Trainer\\/TonyHorton_Trainer_STV_Thumb_540x672_20150630.jpg"
         }
       }
     }
   ]};

   beforeEach(inject(function($injector) {

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');

     // Get the data service
     DataService = $injector.get('DataService');

     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('TrainersController', {'$scope' : $rootScope });
     };
   }));

   it('on trainers success event - set error message as null and populate trainers list', function() {
     createController();
     $rootScope.$emit(DataService.events.GET_TRAINERS_SUCCESS, mockTrainersData);
     expect($rootScope.error).toBe(null);
     expect($rootScope.trainers.length).toBe(2);
   });

   it('on trainers error event - should set error message and have an empty trainers array', function() {
     createController();
     $rootScope.$emit(DataService.events.GET_TRAINERS_ERROR);
     expect($rootScope.error).toBe('Sorry, we could not retrieve the info');
     expect($rootScope.trainers.length).toBe(0);
   });

});
