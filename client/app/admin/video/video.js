'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.video', {
        url: '/video',
        templateUrl: 'app/admin/video/video.html',
        controller: 'AdminVideoCtrl',
        authenticate : true
      });
  });