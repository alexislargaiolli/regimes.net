'use strict';

angular.module('regimesApp')
    .controller('IMCCtrl', function($scope) {
        this.active = false;
        this.weight = null;
        this.size = null;
        this.result = null;

        this.setActive = function() {
            this.active = true;
        }

        this.compute = function(form) {
            if (form.$valid) {
                var size = this.size / 100;
                this.result = Math.round((this.weight / (size * size)) * 100) / 100;
            }else{
              this.result = null;
            }
        }

    });
