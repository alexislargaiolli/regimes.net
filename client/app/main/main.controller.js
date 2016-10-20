'use strict';

angular.module('regimesApp')
    .controller('MainCtrl', function(Actuality, Video) {
        var self = this;
        this.lastNews = null;
        function activate(){
            Actuality.query({sort : 'date', limit : 1}, function(actualities){
                if(actualities.length > 0){
                    self.lastNews = actualities[0];
                }
            });
            Video.query({active : true}, function(videos){
                if(videos.length > 0){
                    self.video = videos[0];
                }
            });
        }
        activate();
    });
