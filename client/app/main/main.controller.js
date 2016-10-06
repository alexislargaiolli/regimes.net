'use strict';

angular.module('regimesApp')
    .controller('MainCtrl', function($sce) {
        this.lastNews = {
            _id : 'dsfsdf',
            date: '10/16/2010',
            title: 'Zoom sur l\'école xdcx',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        };
        this.video =   {
            title: 'Test vidéo',
            url: 'https://www.youtube.com/embed/EUVghecmPYU'
        };

        this.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

    });
