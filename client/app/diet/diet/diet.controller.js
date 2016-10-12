'use strict';

angular.module('regimesApp')
    .controller('DietCtrl', function($scope, $stateParams, Diet) {        
        var self = this;
        this.dietId = $stateParams.id;
        this.current = null;
        this.opinion = {};

        function activate(){
            Diet.get({id:$stateParams.id}, function(diet){
                self.current = diet;
            });
        }
        activate();

        this.submitOpinion = function(form){
            console.log(form.$valid);
        };
    });