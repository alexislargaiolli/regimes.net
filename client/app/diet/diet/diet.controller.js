'use strict';

angular.module('regimesApp')
    .controller('DietCtrl', function($scope, $stateParams) {        
        this.dietId = $stateParams.id;
        this.current = {
            _id: 'segsdf',
            date: '10/16/2010',
            title: 'Régime dunkan',
            img: 'http://material.angularjs.org/latest/img/icons/angular-logo.svg',
            abstract: 'sdfsdf ksdnf sdf kjdskjf ksdfk sdfkjsd fksdf ',
            content: '  sdf dsfsd fsd fsdf sfdsdf sd fsd'
        };
    });
