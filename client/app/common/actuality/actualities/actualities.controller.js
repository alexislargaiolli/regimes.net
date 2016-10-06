'use strict';

angular.module('regimesApp')
    .controller('NewsCtrl', function($scope) {
        this.actualites = [{
            _id: 'seer',
            date: '10/16/2010',
            title: 'Zoom sur l\'école xdcx',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        }, {
            _id: 'seer',
            date: '10/16/2010',
            title: 'Zoom sur l\'école xdcx',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        }];

        this.selectedActuality = null;

        this.select = function(actuality){
        	this.selectedActuality = actuality;
        }
    });
