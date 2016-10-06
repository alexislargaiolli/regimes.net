'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('diet', {
        url: '/diet/:id',
        templateUrl: 'app/diet/diet/diet.html',
        controller: 'DietCtrl as diet'
      });
  });