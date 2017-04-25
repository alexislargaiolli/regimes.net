'use strict';

angular.module('regimesApp')
    .controller('SubheaderCtrl', function($rootScope, $window, $scope, $state, Diet, $mdMedia) {
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
            if ($mdMedia('gt-xs')) {
                angular.element(document.querySelector('#submenuSlimmingDiet')).removeClass('visible');
                angular.element(document.querySelector('#submenuHealthDiet')).removeClass('visible');
                var menu = angular.element(document.querySelector(id));
                menu.addClass('visible');
            }
        }

        $scope.hideMenu = function(id) {
            if ($mdMedia('gt-xs')) {
                var menu = angular.element(document.querySelector(id));
                menu.removeClass('visible');
            }
        }

        function updateSubMenus() {
            var $slimmingBtn = document.querySelector('#subheaderSlimmingBtn');
            var $mainDiapo = document.querySelector('#main-diapo');
            if ($slimmingBtn && $mainDiapo) {
                var width = $slimmingBtn.clientWidth;
                var height = $mainDiapo.clientHeight - 20;
                var submenuSlimming = angular.element(document.querySelector('#submenuSlimmingDiet'));
                submenuSlimming.css('width', width + 'px');
                submenuSlimming.css('max-height', height + 'px');
                var submenuHealth = angular.element(document.querySelector('#submenuHealthDiet'))
                submenuHealth.css('width', width + 'px');
                submenuHealth.css('max-height', height + 'px');
            }
        }

        angular.element($window).bind('resize', function() {
            updateSubMenus();
        });
        angular.element(document).ready(function() {
            updateSubMenus();
        });

    });