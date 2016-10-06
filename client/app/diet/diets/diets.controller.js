'use strict';

angular.module('regimesApp')
    .controller('DietsCtrl', function($scope, $stateParams) {
        if ($stateParams.type == 'slimming') {
            this.title = 'Régimes amincissants';
        } else {
            this.title = 'Régimes santé';
        }
        this.list = [{
            _id : 'segsdf',
            date: '10/16/2010',
            title: 'Régime dunkan',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        },{
            _id : 'segsdf',
            date: '10/16/2010',
            title: 'Régime dunkan',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        },{
            _id : 'segsdf',
            date: '10/16/2010',
            title: 'Régime dunkan',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        }];
    });
