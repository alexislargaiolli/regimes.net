'use strict';

angular.module('regimesApp')
  .factory('Actuality', function ($resource) {    

    var Actuality = $resource('/api/actualities/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/actualities/paginate'}
    });

    // Public API here
    return Actuality;
  });
