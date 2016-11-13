'use strict';

angular.module('regimesApp')
    .factory('Diet', function($resource, $q) {

        var Diet = $resource('/api/diets/:id', { id: '@_id' }, {
            'update': { method: 'PUT' },
            'paginate': { method: 'GET', url: '/api/diets/paginate' },
            'submit': { method: 'POST', url: '/api/diets/submit' },
            'addReview': { method: 'POST', url: '/api/diets/addReview/:id/:adaptability/:efficiency/:impact/:cost', params: { id: '@id', adaptability: '@adaptability', efficiency: '@efficiency', impact: '@impact', cost: '@cost' } }
        });

        var slimming = 0;
        var health = 1;
        var deferred = [];

        function load() {
            deferred[slimming] = $q.defer();
            deferred[health] = $q.defer();

            Diet.query({ dietType: slimming }, function(diets) {
                deferred[slimming].resolve(diets);
            });

            Diet.query({ dietType: health }, function(diets) {
                deferred[health].resolve(diets);
            });
        }

        load();

        function getDiet(type) {
            return deferred[type].promise;
        }

        // Public API here
        return {
            resource: Diet,
            load: load,
            getDiet: getDiet
        };
    });
