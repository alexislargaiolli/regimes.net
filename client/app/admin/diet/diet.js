'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.diet', {
        url: '/diet',
        templateUrl: 'app/admin/diet/diet.html',
        controller: 'AdminDietCtrl',
        authenticate : true
      });
  });