'use strict';

angular.module('regimesApp')
    .controller('IMGCtrl', function($scope) {
        this.active = false;
        this.weight = null;
        this.size = null;
        this.age = null;
        this.sexe = 0;
        this.result = null;

        this.setActive = function() {
            this.active = true;
        }

        this.compute = function(form) {
            if (form.$valid) {
                var size = this.size / 100;
                var imc = Math.round((this.weight / (size * size)) * 100) / 100;
                var result = (1.20 * imc) + (0.23 * this.age) - (10.8 * this.sexe) - 5.4;
                this.result = Math.round((result) * 100) / 100;
            }
        }
    });
