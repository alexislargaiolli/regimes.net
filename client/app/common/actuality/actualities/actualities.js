'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('actualities', {
        url: '/actualities',
        templateUrl: 'app/common/actuality/actualities/actualities.html',
        controller: 'ActualitiesCtrl as actualities'
      });
  });