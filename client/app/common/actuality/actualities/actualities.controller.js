'use strict';

angular.module('regimesApp')
    .controller('ActualitiesCtrl', function(Actuality) {
        var self = this;
        this.list = [];        

        Actuality.query({sort : 'date'}, function(actualites){
            self.list = actualites;
        });
    });
