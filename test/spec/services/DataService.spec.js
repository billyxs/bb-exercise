// testing controller
describe('DataService', function() {
  'use strict';
   var $httpBackend, $rootScope, service, requestHandler;

   // Mock HTTP response
   var getTrainersResponse = {
     "timestamp": "2015-08-06 23:00:04",
     "id": "all",
     "count": "1",
     "items": [
       {
         "displayName": "Tony Horton",
         "id": "tony-horton",
         "description": "",
         "images": {
           "thumbnail.all.main": {
             "orient": "portrait",
             "url": "imgclub.teambeachbody.com\\/club-teambeachbody\\/image\\/upload\\/v1419297113\\/TonyHorton_Trainer_Thumb_540x672_umumne.png",
             "target": [
               "all",
               "small"
             ],
             "type": "png",
             "width": 540,
             "height": 672
           },
           "thumbnail.stv.main": {
             "orient": "portrait",
             "url": "imgclub.teambeachbody.com\\/club-teambeachbody\\/image\\/upload\\/v1433200373\\/Trainer\\/TonyHorton_Trainer_STV_Thumb_540x672_20150630.jpg",
             "target": [
               "all",
               "small"
             ],
             "type": "png",
             "width": 540,
             "height": 672
           }
         }
       }]
     };

   // Set up the module
   beforeEach(module('beachbody'));

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     requestHandler = $httpBackend
                        .when('GET', 'data/trainers.json')
                        .respond(getTrainersResponse);

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');

     // Get the service
     service = $injector.get('DataService');
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('http success - should emit event and send list of trainers', function() {
     spyOn($rootScope, '$emit');
     $httpBackend.expectGET('data/trainers.json');
     service.getTrainers($rootScope);
     $httpBackend.flush();
     expect($rootScope.$emit).toHaveBeenCalledWith(service.events.GET_TRAINERS_SUCCESS, getTrainersResponse);
   });

   it('http error - should emit error event', function() {
     spyOn($rootScope, '$emit');

     requestHandler.respond(404, '');
     $httpBackend.expectGET('data/trainers.json');
     service.getTrainers($rootScope);
     $httpBackend.flush();
     expect($rootScope.$emit).toHaveBeenCalledWith(service.events.GET_TRAINERS_ERROR);
   });
});
