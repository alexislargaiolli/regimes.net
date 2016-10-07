'use strict';

angular.module('regimesApp')
    .controller('MainCtrl', function($sce, Actuality) {
        var self = this;
        this.lastNews = null;
        function activate(){
            Actuality.query({sort : 'date', limit : 1}, function(actualities){
                if(actualities.length > 0){
                    self.lastNews = actualities[0];
                }
            });
        }
        activate();

        this.video =   {
            title: 'Test vidéo',            
            url: 'https://www.youtube.com/embed/Rut2zFWoo3Q'
        };

        this.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

    });
