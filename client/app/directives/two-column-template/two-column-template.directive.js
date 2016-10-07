'use strict';

angular.module('regimesApp')
  .directive('twoColumnTemplate', function () {
    return {
      templateUrl: 'app/directives/two-column-template/two-column-template.html',
      restrict: 'EA',
      transclude : {
        'left': 'leftColumn',
        'right': 'rightColumn'
      },
      scope:{
      	templateTitle : '@'
      }
    };
  });