'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('actuality', {
        url: '/actuality/:id',
        templateUrl: 'app/common/actuality/actuality/actuality.html',
        controller: 'ActualityCtrl as actuality'
      });
  });