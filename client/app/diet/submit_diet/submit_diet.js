'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submit_diet', {
        url: '/submit_diet',
        templateUrl: 'app/diet/submit_diet/submit_diet.html',
        controller: 'SubmitDietCtrl'
      });
  });