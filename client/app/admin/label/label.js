'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.label', {
        url: '/label',
        templateUrl: 'app/admin/label/label.html',
        controller: 'AdminLabelCtrl',
        authenticate : true
      });
  });