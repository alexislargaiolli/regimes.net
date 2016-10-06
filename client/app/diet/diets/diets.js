'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('diets', {
        url: '/diets/:type',
        templateUrl: 'app/diet/diets/diets.html',
        controller: 'DietsCtrl as diets'
      });
  });