'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.actuality', {
        url: '/actuality',
        templateUrl: 'app/admin/actuality/actuality.html',
        controller: 'AdminActualityCtrl',
        authenticate : true
      });
  });