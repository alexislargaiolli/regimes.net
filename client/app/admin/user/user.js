'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.user', {
        url: '/user',
        templateUrl: 'app/admin/user/user.html',
        controller: 'UserCtrl',
        authenticate : true
      });
  });