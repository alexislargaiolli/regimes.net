'use strict';

angular.module('regimesApp')
    .controller('DietCtrl', function($scope, $stateParams, Diet, localStorageService) {
        var self = this;
        this.dietId = $stateParams.id;
        this.current = null;
        this.opinion = {};
        this.average = {};
        this.rated = false;

        function updateAverage(diet) {
            if (diet.average.reviewCount > 0) {
                self.average.adaptability = diet.average.adaptabilitySum / diet.average.reviewCount;
                self.average.efficiency = diet.average.efficiencySum / diet.average.reviewCount;
                self.average.impact = diet.average.impactSum / diet.average.reviewCount;
                self.average.cost = diet.average.costSum / diet.average.reviewCount;
            }
        }

        function activate() {
            self.rated = localStorageService.get($stateParams.id);
            Diet.get({ id: $stateParams.id }, function(diet) {
                self.current = diet;
                updateAverage(diet);
            });
        }
        activate();

        function submitSuccess(diet) {
            updateAverage(diet);
            localStorageService.set($stateParams.id, true);
            self.rated = localStorageService.get($stateParams.id);
        }

        this.submitOpinion = function(form) {
            if (form.$valid) {
                Diet.addReview({
                    id: self.current._id,
                    adaptability: self.opinion.adaptability,
                    efficiency: self.opinion.efficiency,
                    impact: self.opinion.impact,
                    cost: self.opinion.cost
                }, submitSuccess);
            }
        };
    });
