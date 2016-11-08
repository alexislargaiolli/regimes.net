'use strict';

angular.module('regimesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.book', {
        url: '/book',
        templateUrl: 'app/admin/book/book.html',
        controller: 'AdminBookCtrl',
        authenticate : true
      });
  });