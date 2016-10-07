'use strict';

angular.module('regimesApp')
  .directive('mainTemplate', function () {
    return {
      templateUrl: 'app/directives/main-template/main-template.html',
      restrict: 'EA',
      transclude : true,
      scope:{
      	templateTitle : '@'
      }
    };
  });