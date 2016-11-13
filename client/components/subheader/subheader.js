'use strict';

angular.module('regimesApp')
    .controller('SubheaderCtrl', function($rootScope, $scope, $state, Diet) {
        $scope.currentState = $state.current;

        $scope.healthDiets = [];
        $scope.slimmingDiets = [];
        Diet.getDiet(0).then(function(diets) {
            $scope.slimmingDiets = diets;
        });
        Diet.getDiet(1).then(function(diets) {
            $scope.healthDiets = diets;
        });

        $scope.vi = true;

    });
