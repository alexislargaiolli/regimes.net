'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.clinic', {
        url: '/clinic',
        templateUrl: 'app/admin/clinic/clinic.html',
        controller: 'AdminClinicCtrl',
        authenticate : true
      });
  });