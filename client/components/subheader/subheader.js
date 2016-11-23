'use strict';

angular.module('regimesApp')
    .controller('SubheaderCtrl', function($rootScope, $window, $scope, $state, Diet) {
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

        $scope.onLinkClicked = function(dietId) {
            $state.go('diet', { id: dietId });
        }

        $scope.showMenu = function(id) {
            angular.element(document.querySelector('#submenuSlimmingDiet')).removeClass('visible');
            angular.element(document.querySelector('#submenuHealthDiet')).removeClass('visible');
            var menu = angular.element(document.querySelector(id));
            menu.addClass('visible');
        }

        $scope.hideMenu = function(id) {
            var menu = angular.element(document.querySelector(id));
            menu.removeClass('visible');
        }

        function updateSubMenus() {
            console.log('updateSubMenus');
            var width = document.querySelector('#subheaderSlimmingBtn').clientWidth;
            angular.element(document.querySelector('#submenuSlimmingDiet')).css('width', width + 'px');
            angular.element(document.querySelector('#submenuHealthDiet')).css('width', width + 'px');
        }

        angular.element($window).bind('resize', function() {
            updateSubMenus();
        });
        angular.element(document).ready(function() {
            updateSubMenus();
        });

    });
