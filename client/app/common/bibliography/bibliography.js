'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bibliography', {
        url: '/bibliography',
        templateUrl: 'app/common/bibliography/bibliography.html',
        controller: 'BibliographyCtrl as biblioCtrl'
      });
  });