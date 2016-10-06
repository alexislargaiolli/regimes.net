'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/common/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });