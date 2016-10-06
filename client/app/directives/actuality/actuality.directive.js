'use strict';

angular.module('regimesApp')
    .directive('actuality', function() {
        return {
            templateUrl: 'app/directives/actuality/actuality.html',
            restrict: 'EA',
            transclude : true,
            scope: {
                title: '@title',
                date: '@',
                content: '@',
                image: '@',
                icon: '@'
            },
            link: function(scope, element, attrs) {}
        };
    });
