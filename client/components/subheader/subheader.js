'use strict';

angular.module('regimesApp')
  .controller('SubheaderCtrl', function ($rootScope, $scope, $state) {
    $scope.currentState = $state.current;
  });
