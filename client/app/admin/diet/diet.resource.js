'use strict';

angular.module('regimesApp')
  .factory('Diet', function ($resource) {    

    var Diet = $resource('/api/diets/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/diets/paginate'},
        'submit' : {method: 'POST', url : '/api/diets/submit'}
    });

    // Public API here
    return Diet;
  });
