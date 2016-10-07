'use strict';

angular.module('regimesApp')
    .controller('ActualityCtrl', function($stateParams, Actuality) {
        var self = this;
        this.current = null;
        Actuality.get({id : $stateParams.id}, function(actu){
        	self.current = actu;
        });
    });
