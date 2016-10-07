'use strict';

angular.module('regimesApp')
    .controller('DEJCtrl', function() {
        this.active = false;
        this.weight = null;
        this.size = null;
        this.age = null;
        this.sexe = 0;        
        this.activities = [{
        	label : 'Sédentaire',
        	value : 1.33
        },{
        	label : 'Actif',
        	value : 1.55
        },{
        	label : 'Sportif',
        	value : 1.80
        }];
        this.activity = 1.33;
        this.result = null;

        this.setActive = function() {
            this.active = true;
        };

        this.compute = function(form) {
            if (form.$valid) {
                var size = this.size / 100;
                var cst = this.sexe === 0 ? 230 : 259;
                var mb = cst * Math.pow(this.weight, 0.48) * Math.pow(size, 0.5) * Math.pow(this.age, -0.13);
                var result = mb * this.activity;
                this.result = Math.round(result);
            }
        };
    });
