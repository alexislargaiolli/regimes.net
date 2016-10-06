'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clinics', {
        url: '/clinics',
        templateUrl: 'app/diet/clinics/clinics.html',
        controller: 'ClinicsCtrl'
      });
  });